import type { StudentRecordInput } from "./student-repository";

const requiredHeaders = [
  "student_id",
  "name",
  "department",
  "year_label",
  "academic_year",
  "semester",
  "attendance",
  "grades",
  "backlogs",
  "missed",
  "engagement",
  "placement",
] as const;

const numericFields = [
  "semester",
  "attendance",
  "grades",
  "backlogs",
  "missed",
  "fees",
  "engagement",
  "placement",
] as const;

export function parseStudentCsv(csv: string): StudentRecordInput[] {
  const rows = parseCsvRows(csv.replace(/^\uFEFF/, ""));
  const nonEmptyRows = rows.filter((row) => row.some((cell) => cell.trim() !== ""));
  if (nonEmptyRows.length < 2) {
    throw new Error("The CSV needs a header row and at least one student row.");
  }

  const headerRow = nonEmptyRows[0];
  if (!headerRow) throw new Error("The CSV header row is missing.");
  const headers = headerRow.map((header) => header.trim().toLowerCase());
  if (new Set(headers).size !== headers.length) {
    throw new Error("The CSV contains duplicate column headers.");
  }
  const headerIndexes = new Map(headers.map((header, index) => [header, index]));
  const missingHeaders = requiredHeaders.filter((header) => !headerIndexes.has(header));
  if (missingHeaders.length) {
    throw new Error(`Missing required CSV columns: ${missingHeaders.join(", ")}.`);
  }
  if (headers.filter((header) => header === "fees").length > 1) {
    throw new Error("The CSV contains the fees column more than once.");
  }

  const studentIds = new Set<string>();
  return nonEmptyRows.slice(1).map((columns, index) => {
    const rowNumber = index + 2;
    if (columns.length !== headers.length) {
      throw new Error(
        `CSV row ${rowNumber} has ${columns.length} values; expected ${headers.length}.`,
      );
    }
    const value = (header: string) => {
      const columnIndex = headerIndexes.get(header);
      if (columnIndex === undefined) {
        throw new Error(`The CSV is missing the ${header} column.`);
      }
      return (columns[columnIndex] ?? "").trim();
    };
    const studentId = value("student_id");
    if (!studentId) throw new Error(`CSV row ${rowNumber}: student_id is required.`);
    if (studentIds.has(studentId)) {
      throw new Error(`CSV row ${rowNumber}: student_id "${studentId}" appears more than once.`);
    }
    studentIds.add(studentId);

    const text = (header: (typeof requiredHeaders)[number]) => {
      const result = value(header);
      if (!result) throw new Error(`CSV row ${rowNumber}: ${header} is required.`);
      return result;
    };
    const number = (header: (typeof numericFields)[number], fallback?: number) => {
      const raw = header === "fees" && !headerIndexes.has("fees") ? "" : value(header);
      if (!raw && fallback !== undefined) return fallback;
      const result = Number(raw);
      if (!raw || !Number.isFinite(result)) {
        throw new Error(`CSV row ${rowNumber}: ${header} must be a valid number.`);
      }
      return result;
    };

    const semester = number("semester");
    const attendance = number("attendance");
    const grades = number("grades");
    const backlogs = number("backlogs");
    const missed = number("missed");
    const fees = number("fees", 0);
    const engagement = number("engagement");
    const placement = number("placement");
    const boundedValues: [string, number, number, number][] = [
      ["semester", semester, 1, 8],
      ["attendance", attendance, 0, 100],
      ["grades", grades, 0, 100],
      ["backlogs", backlogs, 0, 100],
      ["missed", missed, 0, 100],
      ["fees", fees, 0, 1],
      ["engagement", engagement, 0, 100],
      ["placement", placement, 0, 100],
    ];
    for (const [field, fieldValue, min, max] of boundedValues) {
      if (fieldValue < min || fieldValue > max) {
        throw new Error(`CSV row ${rowNumber}: ${field} must be between ${min} and ${max}.`);
      }
    }
    if (![semester, backlogs, missed, fees].every(Number.isInteger)) {
      throw new Error(
        `CSV row ${rowNumber}: semester, backlogs, missed, and fees must be whole numbers.`,
      );
    }

    return {
      student_id: studentId,
      name: text("name"),
      department: text("department"),
      year_label: text("year_label"),
      academic_year: text("academic_year"),
      semester,
      attendance,
      grades,
      backlogs,
      missed,
      fees,
      engagement,
      placement,
    };
  });
}

function parseCsvRows(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    if (quoted) {
      if (character === '"' && csv[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"' && field.length === 0) {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n" || character === "\r") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      if (character === "\r" && csv[index + 1] === "\n") index += 1;
    } else {
      field += character;
    }
  }

  if (quoted) throw new Error("The CSV contains an unclosed quoted field.");
  if (row.length || field.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
