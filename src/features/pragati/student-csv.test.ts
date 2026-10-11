import { describe, expect, it } from "vitest";
import { parseStudentCsv } from "./student-csv";

const headers =
  "student_id,name,department,year_label,academic_year,semester,attendance,grades,backlogs,missed,engagement,placement,fees";

describe("student CSV import", () => {
  it("parses Excel CSV with a UTF-8 BOM, quoted commas, and CRLF lines", () => {
    const records = parseStudentCsv(
      `\uFEFF${headers}\r\nPRG-1,"Ada, Student",CSE,1st year,2026-27,1,88.5,76,0,1,70,65,0\r\n`,
    );
    expect(records).toEqual([
      {
        student_id: "PRG-1",
        name: "Ada, Student",
        department: "CSE",
        year_label: "1st year",
        academic_year: "2026-27",
        semester: 1,
        attendance: 88.5,
        grades: 76,
        backlogs: 0,
        missed: 1,
        fees: 0,
        engagement: 70,
        placement: 65,
      },
    ]);
  });

  it("supports quoted newlines and defaults missing fees to zero", () => {
    const csv =
      "student_id,name,department,year_label,academic_year,semester,attendance,grades,backlogs,missed,engagement,placement\n" +
      'PRG-1,"Ada\nStudent",CSE,1st year,2026-27,1,88,76,0,1,70,65';
    const [record] = parseStudentCsv(csv);
    expect(record?.name).toBe("Ada\nStudent");
    expect(record?.fees).toBe(0);
  });

  it("rejects repeated IDs within the selected file", () => {
    const record = "PRG-1,Ada,CSE,1st year,2026-27,1,88,76,0,1,70,65,0";
    expect(() => parseStudentCsv(`${headers}\n${record}\n${record}`)).toThrow(
      'student_id "PRG-1" appears more than once',
    );
  });

  it("rejects invalid values and missing required columns with useful feedback", () => {
    expect(() =>
      parseStudentCsv(`${headers}\nPRG-1,Ada,CSE,1st year,2026-27,13,88,76,0,1,70,65,0`),
    ).toThrow("semester must be between 1 and 12");
    expect(() => parseStudentCsv("student_id,name\nPRG-1,Ada")).toThrow(
      "Missing required CSV columns",
    );
  });
});
