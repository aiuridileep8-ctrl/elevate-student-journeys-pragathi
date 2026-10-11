import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Student } from "./data";
import type { StudentRecordInput } from "./student-repository";

export function StudentRecordForm({
  student,
  open,
  onOpenChange,
  onSave,
}: {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (record: StudentRecordInput) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const record: StudentRecordInput = {
      student_id: String(fields.get("student_id") ?? "").trim(),
      name: String(fields.get("name") ?? "").trim(),
      department: String(fields.get("department") ?? "").trim(),
      year_label: String(fields.get("year_label") ?? "").trim(),
      academic_year: String(fields.get("academic_year") ?? "").trim(),
      semester: Number(fields.get("semester")),
      attendance: Number(fields.get("attendance")),
      grades: Number(fields.get("grades")),
      backlogs: Number(fields.get("backlogs")),
      missed: Number(fields.get("missed")),
      fees: Number(fields.get("fees")),
      engagement: Number(fields.get("engagement")),
      placement: Number(fields.get("placement")),
    };

    setSaving(true);
    setError("");
    try {
      await onSave(record);
      onOpenChange(false);
    } catch (cause) {
      console.error("Unable to save student record:", cause);
      setError(getSaveErrorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  const input = (
    name: string,
    label: string,
    options: {
      type?: string;
      min?: number;
      max?: number;
      step?: number;
      readOnly?: boolean;
      placeholder?: string;
    } = {},
  ) => (
    <label className="student-record-field" key={name}>
      <span>{label}</span>
      <input
        name={name}
        type={options.type ?? "text"}
        min={options.min}
        max={options.max}
        step={options.step}
        readOnly={options.readOnly}
        placeholder={options.placeholder}
        defaultValue={getInitialValue(student, name)}
        required
      />
    </label>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="student-record-dialog">
        <DialogHeader>
          <DialogTitle>{student ? "Update student record" : "Add a student"}</DialogTitle>
          <DialogDescription>
            Student data is stored securely and available to approved staff in this institution.
          </DialogDescription>
        </DialogHeader>
        <form className="student-record-form" onSubmit={handleSubmit}>
          <div className="student-record-grid">
            {input("student_id", "Student ID", { readOnly: Boolean(student) })}
            {input("name", "Full name")}
            {input("department", "Department")}
            {input("year_label", "Year of study", { placeholder: "e.g. 2nd year" })}
            {input("academic_year", "Academic year")}
            {input("semester", "Semester", { type: "number", min: 1, max: 12 })}
            {input("attendance", "Attendance (%)", {
              type: "number",
              min: 0,
              max: 100,
              step: 0.01,
            })}
            {input("grades", "Academic score (%)", {
              type: "number",
              min: 0,
              max: 100,
              step: 0.01,
            })}
            {input("backlogs", "Backlogs", { type: "number", min: 0, max: 100, step: 1 })}
            {input("missed", "Missed assignments", { type: "number", min: 0, max: 100, step: 1 })}
            {input("engagement", "Engagement (%)", {
              type: "number",
              min: 0,
              max: 100,
              step: 0.01,
            })}
            {input("placement", "Placement readiness (%)", {
              type: "number",
              min: 0,
              max: 100,
              step: 0.01,
            })}
            <label className="student-record-field">
              <span>Fee dues</span>
              <select name="fees" defaultValue={student?.fees ?? 0}>
                <option value={0}>No outstanding dues</option>
                <option value={1}>Outstanding dues</option>
              </select>
            </label>
          </div>
          {error && (
            <p className="student-record-error" role="alert">
              {error}
            </p>
          )}
          <div className="student-record-actions">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : student ? "Save changes" : "Add student"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getSaveErrorMessage(cause: unknown): string {
  if (cause && typeof cause === "object" && "code" in cause && cause.code === "23505") {
    return "A student with this ID already exists. Enter a unique student ID or edit the existing record.";
  }
  if (cause instanceof Error) return cause.message;
  if (
    cause &&
    typeof cause === "object" &&
    "message" in cause &&
    typeof cause.message === "string"
  ) {
    return cause.message;
  }
  return "The student record could not be saved.";
}

function getInitialValue(student: Student | null, field: string): string | number {
  if (!student) {
    if (field === "academic_year") return "2026–27";
    if (field === "semester") return 5;
    if (field === "year_label") return "1st year";
    if (["attendance", "grades", "backlogs", "missed", "engagement", "placement"].includes(field)) {
      return 0;
    }
    return "";
  }
  const values: Record<string, string | number> = {
    student_id: student.id,
    name: student.name,
    department: student.department,
    year_label: student.year,
    academic_year: student.academicYear ?? "2026–27",
    semester: student.semester ?? 1,
    attendance: student.attendance,
    grades: student.grades,
    backlogs: student.backlogs,
    missed: student.missed,
    fees: student.fees,
    engagement: student.engagement,
    placement: student.placement,
  };
  return values[field] ?? "";
}
