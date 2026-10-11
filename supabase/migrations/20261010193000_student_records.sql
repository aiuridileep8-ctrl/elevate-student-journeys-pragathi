create table if not exists public.staff_access (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  student_id text primary key check (length(trim(student_id)) between 1 and 64),
  name text not null check (length(trim(name)) between 1 and 160),
  department text not null check (length(trim(department)) between 1 and 120),
  year_label text not null check (length(trim(year_label)) between 1 and 40),
  academic_year text not null check (length(trim(academic_year)) between 1 and 20),
  semester smallint not null check (semester between 1 and 12),
  attendance numeric(5, 2) not null check (attendance between 0 and 100),
  grades numeric(5, 2) not null check (grades between 0 and 100),
  backlogs integer not null check (backlogs between 0 and 100),
  missed integer not null check (missed between 0 and 100),
  fees smallint not null default 0 check (fees in (0, 1)),
  engagement numeric(5, 2) not null check (engagement between 0 and 100),
  placement numeric(5, 2) not null check (placement between 0 and 100),
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists students_name_idx on public.students (name);
create index if not exists students_department_semester_idx
  on public.students (department, academic_year, semester);

create or replace function public.set_student_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_student_updated_at();

alter table public.staff_access enable row level security;
alter table public.students enable row level security;

revoke all on public.staff_access from anon, authenticated;
grant select on public.staff_access to authenticated;
revoke all on public.students from anon, authenticated;
grant select, insert, update on public.students to authenticated;

drop policy if exists "Staff can read their own access" on public.staff_access;
create policy "Staff can read their own access"
  on public.staff_access for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Approved staff can read students" on public.students;
create policy "Approved staff can read students"
  on public.students for select to authenticated
  using (
    exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
  );

drop policy if exists "Approved staff can add students" on public.students;
create policy "Approved staff can add students"
  on public.students for insert to authenticated
  with check (
    exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
  );

drop policy if exists "Approved staff can update students" on public.students;
create policy "Approved staff can update students"
  on public.students for update to authenticated
  using (
    exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
  )
  with check (
    exists (
      select 1 from public.staff_access
      where user_id = (select auth.uid()) and is_active
    )
    and (created_by is null or created_by = (select auth.uid()))
  );

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
        and tablename = 'students'
  ) then
    alter publication supabase_realtime add table public.students;
  end if;
  if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'staff_access'
  ) then
      alter publication supabase_realtime add table public.staff_access;
  end if;
end;
$$;
