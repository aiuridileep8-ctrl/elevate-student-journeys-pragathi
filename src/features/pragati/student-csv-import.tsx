import { useRef, useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { parseStudentCsv } from "./student-csv";
import type { StudentRecordInput } from "./student-repository";

export function StudentCsvImport({
  onImport,
}: {
  onImport: (records: StudentRecordInput[]) => Promise<void>;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<StudentRecordInput[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [importing, setImporting] = useState(false);

  const close = (nextOpen: boolean) => {
    if (!nextOpen && importing) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      setRecords([]);
      setFileName("");
      setError("");
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const selectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    input.value = "";
    setRecords([]);
    setFileName(file.name);
    setError("");
    try {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        throw new Error("Please export your Excel sheet as a CSV UTF-8 file and select it here.");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("The CSV file must be 5 MB or smaller.");
      }
      setRecords(parseStudentCsv(await file.text()));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The CSV file could not be read.");
    }
  };

  const importRecords = async () => {
    setImporting(true);
    setError("");
    try {
      await onImport(records);
      setOpen(false);
      setRecords([]);
      setFileName("");
      if (fileInput.current) fileInput.current.value = "";
    } catch (cause) {
      console.error("Unable to import student CSV:", cause);
      setError(getImportErrorMessage(cause));
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Import CSV
      </Button>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="student-record-dialog">
          <DialogHeader>
            <DialogTitle>Import student records</DialogTitle>
            <DialogDescription>
              Choose a CSV UTF-8 file exported from Excel. The rows will be added to your live
              roster using your staff account.
            </DialogDescription>
          </DialogHeader>
          <div className="student-csv-import">
            <p>
              Required columns:{" "}
              <code>
                student_id, name, department, year_label, academic_year, semester, attendance,
                grades, backlogs, missed, engagement, placement
              </code>
              .<code>fees</code> is optional and defaults to 0.
            </p>
            <p>IDs must be unique. Existing IDs cause the entire import to be rejected.</p>
            <input
              ref={fileInput}
              aria-label="Choose CSV file"
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => void selectFile(event)}
            />
            {fileName && <p className="student-csv-selected">{fileName}</p>}
            {records.length > 0 && (
              <p className="student-csv-selected" role="status">
                Ready to import {records.length} student{" "}
                {records.length === 1 ? "record" : "records"}.
              </p>
            )}
            {error && (
              <p className="student-record-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="student-record-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => close(false)}
              disabled={importing}
            >
              Cancel
            </Button>
            <Button onClick={() => void importRecords()} disabled={!records.length || importing}>
              {importing ? "Importing..." : `Import ${records.length || ""} students`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function getImportErrorMessage(cause: unknown): string {
  if (cause && typeof cause === "object" && "code" in cause && cause.code === "23505") {
    return "At least one student ID already exists in the roster. No rows were imported; correct the IDs and try again.";
  }
  if (
    cause &&
    typeof cause === "object" &&
    "message" in cause &&
    typeof cause.message === "string"
  ) {
    return cause.message;
  }
  return "The student records could not be imported.";
}
