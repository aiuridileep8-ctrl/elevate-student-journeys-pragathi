alter table public.students
  drop constraint if exists students_semester_check;

alter table public.students
  add constraint students_semester_check
  check (semester between 1 and 8) not valid;
