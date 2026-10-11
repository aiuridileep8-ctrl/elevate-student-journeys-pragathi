create table if not exists public.interventions (
  id uuid primary key default gen_random_uuid(),
  student_id text not null references public.students (student_id) on delete cascade,
  student_name text not null,
  action text not null check (length(trim(action)) between 1 and 160),
  counsellor text not null check (length(trim(counsellor)) between 1 and 160),
  counsellor_email text not null check (
    length(counsellor_email) <= 320
    and position('@' in counsellor_email) > 1
  ),
  assigned_by uuid not null references auth.users (id) on delete cascade,
  status text not null default 'Planned' check (status in ('Planned', 'In progress', 'Completed')),
  created_at timestamptz not null default now()
);

create index if not exists interventions_created_at_idx
  on public.interventions (created_at desc);
create index if not exists interventions_student_id_idx
  on public.interventions (student_id);

create table if not exists public.intervention_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_email text not null,
  title text not null,
  body text not null,
  intervention_id uuid not null references public.interventions (id) on delete cascade,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists intervention_notifications_recipient_created_idx
  on public.intervention_notifications (lower(recipient_email), created_at desc);

alter table public.interventions enable row level security;
alter table public.intervention_notifications enable row level security;

revoke all on public.interventions from anon, authenticated;
grant select, insert on public.interventions to authenticated;
grant update (status) on public.interventions to authenticated;
revoke all on public.intervention_notifications from anon, authenticated;
grant select on public.intervention_notifications to authenticated;
grant update (read_at) on public.intervention_notifications to authenticated;

drop policy if exists "Approved staff can read interventions" on public.interventions;
create policy "Approved staff can read interventions"
  on public.interventions for select to authenticated
  using (
    exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
  );

drop policy if exists "Approved staff can assign interventions" on public.interventions;
create policy "Approved staff can assign interventions"
  on public.interventions for insert to authenticated
  with check (
    assigned_by = (select auth.uid())
    and exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
  );

drop policy if exists "Approved staff can update interventions" on public.interventions;
create policy "Approved staff can update interventions"
  on public.interventions for update to authenticated
  using (
    exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
  );

drop policy if exists "Recipients can read their intervention notifications"
  on public.intervention_notifications;
create policy "Recipients can read their intervention notifications"
  on public.intervention_notifications for select to authenticated
  using (lower(recipient_email) = lower((select auth.jwt() ->> 'email')));

drop policy if exists "Recipients can mark their intervention notifications read"
  on public.intervention_notifications;
create policy "Recipients can mark their intervention notifications read"
  on public.intervention_notifications for update to authenticated
  using (lower(recipient_email) = lower((select auth.jwt() ->> 'email')))
  with check (lower(recipient_email) = lower((select auth.jwt() ->> 'email')));

create or replace function public.notify_intervention_assignee()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.intervention_notifications (
    recipient_email,
    title,
    body,
    intervention_id
  )
  values (
    lower(new.counsellor_email),
    'New student intervention assigned',
    new.action || ' assigned for ' || new.student_name || '.',
    new.id
  );
  return new;
end;
$$;

drop trigger if exists interventions_notify_assignee on public.interventions;
create trigger interventions_notify_assignee
after insert on public.interventions
for each row execute function public.notify_intervention_assignee();

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'interventions'
  ) then
    alter publication supabase_realtime add table public.interventions;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'intervention_notifications'
  ) then
    alter publication supabase_realtime add table public.intervention_notifications;
  end if;
end;
$$;
