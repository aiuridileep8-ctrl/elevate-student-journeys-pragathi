import { describe, expect, it } from "vitest";
import type { Database } from "@/lib/database.types";
import { rowFromStudent, studentFromRow } from "./student-repository";

type StudentRow = Database["public"]["Tables"]["students"]["Row"];

const row: StudentRow = {
  student_id: "PRG-1001",
  name: "Ada Student",
  department: "Computer Science",
  year_label: "2nd year",
  academic_year: "2026-27",
  semester: 5,
  attendance: 82.5,
  grades: 77,
  backlogs: 1,
  missed: 2,
  fees: 0,
  engagement: 69,
  placement: 64,
  created_by: "user-1",
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-02T00:00:00.000Z",
};

describe("student database mapping", () => {
  it("maps saved student rows to the profile shape used by the dashboard", () => {
    expect(studentFromRow(row)).toEqual({
      id: row.student_id,
      name: row.name,
      initials: "AS",
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
    });
  });

  it("trims editable record values and excludes server-managed columns", () => {
    const student = { ...studentFromRow(row), name: " Ada Student ", id: " PRG-1001 " };
    expect(rowFromStudent(student)).toEqual({
      student_id: "PRG-1001",
      name: "Ada Student",
      department: row.department,
      year_label: row.year_label,
      academic_year: row.academic_year,
      semester: row.semester,
      attendance: row.attendance,
      grades: row.grades,
      backlogs: row.backlogs,
      missed: row.missed,
      fees: row.fees,
      engagement: row.engagement,
      placement: row.placement,
    });
  });

  it("rejects records that have no semester or academic year", () => {
    const student = studentFromRow(row);
    const { semester: _semester, ...missingSemester } = student;
    expect(() => rowFromStudent(missingSemester)).toThrow("needs an academic year and semester");
  });
});
