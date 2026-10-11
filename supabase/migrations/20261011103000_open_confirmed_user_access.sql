drop policy if exists "Approved staff can read students" on public.students;
drop policy if exists "Approved staff can add students" on public.students;
drop policy if exists "Approved staff can update students" on public.students;

create policy "Authenticated users can read students"
  on public.students for select to authenticated
  using (true);

create policy "Authenticated users can add students"
  on public.students for insert to authenticated
  with check (created_by = (select auth.uid()));

create policy "Authenticated users can update students"
  on public.students for update to authenticated
  using (true)
  with check (true);

drop policy if exists "Approved staff can read interventions" on public.interventions;
drop policy if exists "Approved staff can assign interventions" on public.interventions;
drop policy if exists "Approved staff can update interventions" on public.interventions;

create policy "Authenticated users can read interventions"
  on public.interventions for select to authenticated
  using (true);

create policy "Authenticated users can assign interventions"
  on public.interventions for insert to authenticated
  with check (assigned_by = (select auth.uid()));

create policy "Authenticated users can update interventions"
  on public.interventions for update to authenticated
  using (true)
  with check (true);
