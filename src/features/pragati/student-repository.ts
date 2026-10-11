import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import type { Student } from "./data";

type StudentRow = Database["public"]["Tables"]["students"]["Row"];
export type StudentRecordInput = Omit<StudentRow, "created_by" | "created_at" | "updated_at">;

export function studentFromRow(row: StudentRow): Student {
  const initials = row.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return {
    id: row.student_id,
    name: row.name,
    initials,
    department: row.department,
    year: row.year_label,
    semester: row.semester,
    academicYear: row.academic_year,
    attendance: row.attendance,
    grades: row.grades,
    backlogs: row.backlogs,
    missed: row.missed,
    fees: row.fees,
    engagement: row.engagement,
    placement: row.placement,
  };
}

export function studentToRow(student: StudentRecordInput): StudentRecordInput {
  return {
    student_id: student.student_id.trim(),
    name: student.name.trim(),
    department: student.department.trim(),
    year_label: student.year_label.trim(),
    academic_year: student.academic_year.trim(),
    semester: student.semester,
    attendance: student.attendance,
    grades: student.grades,
    backlogs: student.backlogs,
    missed: student.missed,
    fees: student.fees,
    engagement: student.engagement,
    placement: student.placement,
  };
}

export function rowFromStudent(student: Student): StudentRecordInput {
  if (student.semester == null || student.academicYear == null) {
    throw new Error("A saved student record needs an academic year and semester.");
  }
  return {
    student_id: student.id.trim(),
    name: student.name.trim(),
    department: student.department.trim(),
    year_label: student.year.trim(),
    academic_year: student.academicYear.trim(),
    semester: student.semester,
    attendance: student.attendance,
    grades: student.grades,
    backlogs: student.backlogs,
    missed: student.missed,
    fees: student.fees,
    engagement: student.engagement,
    placement: student.placement,
  };
}

export async function fetchStudentRecords(): Promise<Student[]> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const rows: StudentRow[] = [];
  const pageSize = 500;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("name")
      .range(from, from + pageSize - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < pageSize) break;
  }
  return rows.map(studentFromRow);
}
