alter table public.interventions
  add column if not exists due_date date,
  add column if not exists notes text not null default '',
  add column if not exists completion_outcome text;

grant update (status, due_date, notes, completion_outcome)
  on public.interventions to authenticated;
