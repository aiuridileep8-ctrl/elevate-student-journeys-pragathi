import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-mcKfYQhL.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ArrowRight, C as ChevronDown, D as BookOpen, E as Building2, O as Bell, S as ChevronRight, T as CalendarDays, _ as Ellipsis, a as Sparkles, b as CircleQuestionMark, c as Search, f as LifeBuoy, i as Target, j as Activity, k as ArrowUpRight, l as Menu, m as Funnel, n as Users, o as ShieldCheck, p as LayoutDashboard, r as TrendingDown, s as Settings2, t as X, v as Download, w as Check, x as CircleCheck, y as Database } from "../_libs/lucide-react.mjs";
import { a as students, i as riskScore, n as riskFactors, r as riskLevel, t as recommendations } from "./data-FbCW8h7b.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, l as Slot, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJmPuPu3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function StudentRecordForm({ student, open, onOpenChange, onSave }) {
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function handleSubmit(event) {
		event.preventDefault();
		const fields = new FormData(event.currentTarget);
		const record = {
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
			placement: Number(fields.get("placement"))
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
	const input = (name, label, options = {}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "student-record-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type: options.type ?? "text",
			min: options.min,
			max: options.max,
			step: options.step,
			readOnly: options.readOnly,
			placeholder: options.placeholder,
			defaultValue: getInitialValue(student, name),
			required: true
		})]
	}, name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "student-record-dialog",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: student ? "Update student record" : "Add a student" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Student data is stored securely and available to approved staff in this institution." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "student-record-form",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "student-record-grid",
						children: [
							input("student_id", "Student ID", { readOnly: Boolean(student) }),
							input("name", "Full name"),
							input("department", "Department"),
							input("year_label", "Year of study", { placeholder: "e.g. 2nd year" }),
							input("academic_year", "Academic year"),
							input("semester", "Semester", {
								type: "number",
								min: 1,
								max: 8
							}),
							input("attendance", "Attendance (%)", {
								type: "number",
								min: 0,
								max: 100,
								step: .01
							}),
							input("grades", "Academic score (%)", {
								type: "number",
								min: 0,
								max: 100,
								step: .01
							}),
							input("backlogs", "Backlogs", {
								type: "number",
								min: 0,
								max: 100,
								step: 1
							}),
							input("missed", "Missed assignments", {
								type: "number",
								min: 0,
								max: 100,
								step: 1
							}),
							input("engagement", "Engagement (%)", {
								type: "number",
								min: 0,
								max: 100,
								step: .01
							}),
							input("placement", "Placement readiness (%)", {
								type: "number",
								min: 0,
								max: 100,
								step: .01
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "student-record-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fee dues" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "fees",
									defaultValue: student?.fees ?? 0,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 0,
										children: "No outstanding dues"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 1,
										children: "Outstanding dues"
									})]
								})]
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "student-record-error",
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "student-record-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: saving,
							children: saving ? "Saving..." : student ? "Save changes" : "Add student"
						})]
					})
				]
			})]
		})
	});
}
function getSaveErrorMessage(cause) {
	if (cause && typeof cause === "object" && "code" in cause && cause.code === "23505") return "A student with this ID already exists. Enter a unique student ID or edit the existing record.";
	if (cause instanceof Error) return cause.message;
	if (cause && typeof cause === "object" && "message" in cause && typeof cause.message === "string") return cause.message;
	return "The student record could not be saved.";
}
function getInitialValue(student, field) {
	if (!student) {
		if (field === "academic_year") return "2026–27";
		if (field === "semester") return 5;
		if (field === "year_label") return "1st year";
		if ([
			"attendance",
			"grades",
			"backlogs",
			"missed",
			"engagement",
			"placement"
		].includes(field)) return 0;
		return "";
	}
	return {
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
		placement: student.placement
	}[field] ?? "";
}
var requiredHeaders = [
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
	"placement"
];
function parseStudentCsv(csv) {
	const nonEmptyRows = parseCsvRows(csv.replace(/^\uFEFF/, "")).filter((row) => row.some((cell) => cell.trim() !== ""));
	if (nonEmptyRows.length < 2) throw new Error("The CSV needs a header row and at least one student row.");
	const headerRow = nonEmptyRows[0];
	if (!headerRow) throw new Error("The CSV header row is missing.");
	const headers = headerRow.map((header) => header.trim().toLowerCase());
	if (new Set(headers).size !== headers.length) throw new Error("The CSV contains duplicate column headers.");
	const headerIndexes = new Map(headers.map((header, index) => [header, index]));
	const missingHeaders = requiredHeaders.filter((header) => !headerIndexes.has(header));
	if (missingHeaders.length) throw new Error(`Missing required CSV columns: ${missingHeaders.join(", ")}.`);
	if (headers.filter((header) => header === "fees").length > 1) throw new Error("The CSV contains the fees column more than once.");
	const studentIds = /* @__PURE__ */ new Set();
	return nonEmptyRows.slice(1).map((columns, index) => {
		const rowNumber = index + 2;
		if (columns.length !== headers.length) throw new Error(`CSV row ${rowNumber} has ${columns.length} values; expected ${headers.length}.`);
		const value = (header) => {
			const columnIndex = headerIndexes.get(header);
			if (columnIndex === void 0) throw new Error(`The CSV is missing the ${header} column.`);
			return (columns[columnIndex] ?? "").trim();
		};
		const studentId = value("student_id");
		if (!studentId) throw new Error(`CSV row ${rowNumber}: student_id is required.`);
		if (studentIds.has(studentId)) throw new Error(`CSV row ${rowNumber}: student_id "${studentId}" appears more than once.`);
		studentIds.add(studentId);
		const text = (header) => {
			const result = value(header);
			if (!result) throw new Error(`CSV row ${rowNumber}: ${header} is required.`);
			return result;
		};
		const number = (header, fallback) => {
			const raw = header === "fees" && !headerIndexes.has("fees") ? "" : value(header);
			if (!raw && fallback !== void 0) return fallback;
			const result = Number(raw);
			if (!raw || !Number.isFinite(result)) throw new Error(`CSV row ${rowNumber}: ${header} must be a valid number.`);
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
		const boundedValues = [
			[
				"semester",
				semester,
				1,
				8
			],
			[
				"attendance",
				attendance,
				0,
				100
			],
			[
				"grades",
				grades,
				0,
				100
			],
			[
				"backlogs",
				backlogs,
				0,
				100
			],
			[
				"missed",
				missed,
				0,
				100
			],
			[
				"fees",
				fees,
				0,
				1
			],
			[
				"engagement",
				engagement,
				0,
				100
			],
			[
				"placement",
				placement,
				0,
				100
			]
		];
		for (const [field, fieldValue, min, max] of boundedValues) if (fieldValue < min || fieldValue > max) throw new Error(`CSV row ${rowNumber}: ${field} must be between ${min} and ${max}.`);
		if (![
			semester,
			backlogs,
			missed,
			fees
		].every(Number.isInteger)) throw new Error(`CSV row ${rowNumber}: semester, backlogs, missed, and fees must be whole numbers.`);
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
			placement
		};
	});
}
function parseCsvRows(csv) {
	const rows = [];
	let row = [];
	let field = "";
	let quoted = false;
	for (let index = 0; index < csv.length; index += 1) {
		const character = csv[index];
		if (quoted) if (character === "\"" && csv[index + 1] === "\"") {
			field += "\"";
			index += 1;
		} else if (character === "\"") quoted = false;
		else field += character;
		else if (character === "\"" && field.length === 0) quoted = true;
		else if (character === ",") {
			row.push(field);
			field = "";
		} else if (character === "\n" || character === "\r") {
			row.push(field);
			rows.push(row);
			row = [];
			field = "";
			if (character === "\r" && csv[index + 1] === "\n") index += 1;
		} else field += character;
	}
	if (quoted) throw new Error("The CSV contains an unclosed quoted field.");
	if (row.length || field.length) {
		row.push(field);
		rows.push(row);
	}
	return rows;
}
function StudentCsvImport({ onImport }) {
	const fileInput = (0, import_react.useRef)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [records, setRecords] = (0, import_react.useState)([]);
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [importing, setImporting] = (0, import_react.useState)(false);
	const close = (nextOpen) => {
		if (!nextOpen && importing) return;
		setOpen(nextOpen);
		if (!nextOpen) {
			setRecords([]);
			setFileName("");
			setError("");
			if (fileInput.current) fileInput.current.value = "";
		}
	};
	const selectFile = async (event) => {
		const input = event.currentTarget;
		const file = input.files?.[0];
		if (!file) return;
		input.value = "";
		setRecords([]);
		setFileName(file.name);
		setError("");
		try {
			if (!file.name.toLowerCase().endsWith(".csv")) throw new Error("Please export your Excel sheet as a CSV UTF-8 file and select it here.");
			if (file.size > 5242880) throw new Error("The CSV file must be 5 MB or smaller.");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "outline",
		onClick: () => setOpen(true),
		children: "Import CSV"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "student-record-dialog",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Import student records" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Choose a CSV UTF-8 file exported from Excel. The rows will be added to your live roster using your staff account." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "student-csv-import",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Required columns:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "student_id, name, department, year_label, academic_year, semester, attendance, grades, backlogs, missed, engagement, placement" }),
							".",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "fees" }),
							" is optional and defaults to 0."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "IDs must be unique. Existing IDs cause the entire import to be rejected." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInput,
							"aria-label": "Choose CSV file",
							type: "file",
							accept: ".csv,text/csv",
							onChange: (event) => void selectFile(event)
						}),
						fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "student-csv-selected",
							children: fileName
						}),
						records.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "student-csv-selected",
							role: "status",
							children: [
								"Ready to import ",
								records.length,
								" student",
								" ",
								records.length === 1 ? "record" : "records",
								"."
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "student-record-error",
							role: "alert",
							children: error
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "student-record-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => close(false),
						disabled: importing,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void importRecords(),
						disabled: !records.length || importing,
						children: importing ? "Importing..." : `Import ${records.length || ""} students`
					})]
				})
			]
		})
	})] });
}
function getImportErrorMessage(cause) {
	if (cause && typeof cause === "object" && "code" in cause && cause.code === "23505") return "At least one student ID already exists in the roster. No rows were imported; correct the IDs and try again.";
	if (cause && typeof cause === "object" && "message" in cause && typeof cause.message === "string") return cause.message;
	return "The student records could not be imported.";
}
function studentFromRow(row) {
	const initials = row.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
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
		placement: row.placement
	};
}
function studentToRow(student) {
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
		placement: student.placement
	};
}
async function fetchStudentRecords() {
	if (!supabase) throw new Error("Supabase is not configured.");
	const rows = [];
	const pageSize = 500;
	for (let from = 0;; from += pageSize) {
		const { data, error } = await supabase.from("students").select("*").order("name").range(from, from + pageSize - 1);
		if (error) throw error;
		rows.push(...data);
		if (data.length < pageSize) break;
	}
	return rows.map(studentFromRow);
}
function useStudentRecords(enabled) {
	const [students, setStudents] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(enabled);
	const [error, setError] = (0, import_react.useState)("");
	const [lastUpdated, setLastUpdated] = (0, import_react.useState)(null);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			const records = await fetchStudentRecords();
			setStudents(records);
			setLastUpdated((/* @__PURE__ */ new Date()).toLocaleTimeString());
			setError("");
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Student records could not be refreshed.");
			throw cause;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const client = supabase;
		if (!enabled || !client) {
			setLoading(false);
			return;
		}
		let active = true;
		setLoading(true);
		fetchStudentRecords().then((records) => {
			if (!active) return;
			setStudents(records);
			setLastUpdated((/* @__PURE__ */ new Date()).toLocaleTimeString());
			setError("");
		}).catch((cause) => {
			console.error("Unable to load student records:", cause);
			if (active) setError(cause instanceof Error ? cause.message : "Student records could not be loaded. Please try again.");
		}).finally(() => {
			if (active) setLoading(false);
		});
		const channel = client.channel("live-student-records").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "students"
		}, () => {
			fetchStudentRecords().then((records) => {
				if (!active) return;
				setStudents(records);
				setLastUpdated((/* @__PURE__ */ new Date()).toLocaleTimeString());
				setError("");
			}).catch((cause) => {
				console.error("Unable to refresh student records:", cause);
				if (active) setError(cause instanceof Error ? cause.message : "Student records could not be refreshed.");
			});
		}).subscribe((status, cause) => {
			if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
				console.error("Student live updates are unavailable:", cause);
				if (active) setError("Live updates are unavailable. Reload to check the latest records.");
			}
		});
		return () => {
			active = false;
			client.removeChannel(channel);
		};
	}, [enabled]);
	return {
		students,
		loading,
		error,
		lastUpdated,
		refresh,
		setError
	};
}
var navItems = [
	{
		name: "Overview",
		icon: LayoutDashboard
	},
	{
		name: "Students",
		icon: Users
	},
	{
		name: "Risk analytics",
		icon: Activity
	},
	{
		name: "Interventions",
		icon: Target
	},
	{
		name: "Data sources",
		icon: Database
	}
];
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "brand",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "brand-mark",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
				]
			}),
			"stride",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: "."
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "brand-sub",
		children: "EVERY STUDENT. A STEP FORWARD."
	})] });
}
function RiskBadge({ score }) {
	const level = riskLevel(score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `risk-badge ${level}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `legend-dot ${level}` }),
			score,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-normal",
				children: level === "high" ? "High" : level === "moderate" ? "Moderate" : "Low"
			})
		]
	});
}
function interventionFromRow(row) {
	return {
		id: row.id,
		studentId: row.student_id,
		student: row.student_name,
		action: row.action,
		counsellor: row.counsellor,
		counsellorEmail: row.counsellor_email,
		status: row.status,
		dueDate: row.due_date,
		notes: row.notes,
		completionOutcome: row.completion_outcome
	};
}
function dateAfterDays(days) {
	const date = /* @__PURE__ */ new Date();
	date.setDate(date.getDate() + days);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function getInterventionErrorMessage(cause) {
	if (cause && typeof cause === "object" && "code" in cause && cause.code === "PGRST205") return "The intervention database tables are missing. Run supabase/migrations/20261010233000_intervention_notifications.sql in the Supabase SQL Editor, then retry.";
	if (cause && typeof cause === "object" && "code" in cause && (cause.code === "PGRST204" || cause.code === "42703")) return "The follow-up database columns are missing. Run supabase/migrations/20261011004700_intervention_follow_up.sql in the Supabase SQL Editor, then retry.";
	if (cause && typeof cause === "object" && "message" in cause && typeof cause.message === "string") return cause.message;
	if (cause instanceof Error) return cause.message;
	return "The intervention could not be assigned.";
}
function RiskPlot({ students, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "risk-plot",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "plot-y-title",
				children: "Student risk score"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "plot-svg",
				viewBox: "0 0 530 200",
				role: "img",
				"aria-label": "Simulated cohort risk distribution by attendance and risk score",
				children: [
					[
						20,
						60,
						100,
						140,
						180
					].map((y, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "38",
						y1: y,
						x2: "515",
						y2: y,
						className: "plot-grid"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "27",
						y: y + 3,
						textAnchor: "end",
						className: "plot-text",
						children: 100 - i * 25
					})] }, y)),
					[
						40,
						135,
						230,
						325,
						420,
						515
					].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: x,
						y1: "20",
						x2: x,
						y2: "180",
						className: "plot-grid"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x,
						y: "198",
						textAnchor: "middle",
						className: "plot-text",
						children: [i * 20, "%"]
					})] }, x)),
					students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 38 + s.attendance * 4.77,
						cy: 180 - riskScore(s) * 1.6,
						r: "5",
						className: `plot-point plot-${riskLevel(riskScore(s))}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `View ${s.name}`,
						onClick: () => onSelect(s),
						onKeyDown: (e) => {
							if (e.key === "Enter") onSelect(s);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${s.name}: risk ${riskScore(s)}, attendance ${s.attendance}%` })
					}, s.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "plot-axis-title",
				children: "Attendance rate"
			})
		]
	});
}
function StudentDetails({ student, close, assign, edit }) {
	const [attendance, setAttendance] = (0, import_react.useState)(student.attendance);
	const [action, setAction] = (0, import_react.useState)(recommendations[0] ?? "Guardian outreach");
	const [counsellor, setCounsellor] = (0, import_react.useState)("Dr. Meera Krishnan");
	const [counsellorEmail, setCounsellorEmail] = (0, import_react.useState)("");
	const [dueDate, setDueDate] = (0, import_react.useState)(() => dateAfterDays(7));
	const [assigned, setAssigned] = (0, import_react.useState)(false);
	const [assigning, setAssigning] = (0, import_react.useState)(false);
	const [assignmentMessage, setAssignmentMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", handler);
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handler);
			document.body.style.overflow = previous;
		};
	}, [close]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "detail-overlay",
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "detail-panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${student.name} student profile`,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Unified student profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => edit(student),
							children: "Edit record"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Close profile",
							onClick: close,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-profile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "student-avatar",
						children: student.initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: student.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						student.id,
						" · ",
						student.department,
						" · ",
						student.year
					] })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-metrics",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "detail-metric",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Attendance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [student.attendance, "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "detail-metric",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Academic score" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [student.grades, "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "detail-metric",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Backlogs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: student.backlogs })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Explainable risk score" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "detail-score",
								children: [riskScore(student), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "text-sm text-muted-foreground font-normal",
									children: " / 100"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { score: riskScore(student) })]
						}),
						riskFactors(student).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "factor-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "factor-track",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "factor-fill",
										style: { "--factor-width": `${f.value / 30 * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-10 text-right",
									children: ["+", f.value.toFixed(1)]
								})
							]
						}, f.name)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "prototype-note",
							children: "Transparent weighted scoring · Attendance 30%, academics 20%, backlogs 15%, assignments 10%, fees 10%, engagement 10%, placement 5%."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "What-if attendance simulator" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "attendance-range",
								children: "Planned attendance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [attendance, "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "attendance-range",
							className: "simulation-control",
							type: "range",
							min: student.attendance,
							max: "100",
							value: attendance,
							onChange: (e) => setAttendance(Number(e.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "simulation-result",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Projected risk ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: riskScore(student, attendance) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "positive",
								children: [
									"↓ ",
									riskScore(student) - riskScore(student, attendance),
									" points"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "detail-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recommended intervention" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "field-label",
							htmlFor: "intervention-action",
							children: "Intervention"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "intervention-action",
							className: "select-control",
							value: action,
							onChange: (e) => {
								setAction(e.target.value);
								setAssigned(false);
							},
							children: recommendations.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "field-label",
							htmlFor: "counsellor",
							children: "Assign to counsellor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "counsellor",
							className: "select-control",
							value: counsellor,
							onChange: (e) => setCounsellor(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Dr. Meera Krishnan" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Prof. Rajesh Kumar" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Ms. Aditi Rao" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "field-label",
							htmlFor: "counsellor-email",
							children: "Assignee email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "counsellor-email",
							className: "select-control",
							type: "email",
							autoComplete: "email",
							required: true,
							value: counsellorEmail,
							onChange: (event) => setCounsellorEmail(event.target.value),
							placeholder: "counsellor@institution.edu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "field-label",
							htmlFor: "intervention-due-date",
							children: "Follow-up due date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "intervention-due-date",
							className: "select-control",
							type: "date",
							required: true,
							value: dueDate,
							onChange: (event) => setDueDate(event.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "full-width",
							disabled: assigned || assigning || !counsellorEmail,
							onClick: () => {
								setAssigning(true);
								setAssignmentMessage("");
								assign({
									studentId: student.id,
									student: student.name,
									action,
									counsellor,
									counsellorEmail,
									status: "Planned",
									dueDate,
									notes: "",
									completionOutcome: null
								}).then(({ emailSent, emailError }) => {
									setAssigned(true);
									setAssignmentMessage(emailSent ? `Assigned to ${counsellor}. An in-app notification and email were sent.` : `Assigned to ${counsellor} and an in-app notification was created, but the email could not be sent${emailError ? `: ${emailError}` : "."}`);
								}).catch((cause) => {
									console.error("Unable to assign intervention:", cause);
									setAssignmentMessage(getInterventionErrorMessage(cause));
								}).finally(() => setAssigning(false));
							},
							children: [assigned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}), assigning ? "Assigning..." : assigned ? "Intervention assigned" : "Assign intervention"]
						}),
						assignmentMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "prototype-note",
							role: assigned ? "status" : "alert",
							children: assignmentMessage
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "prototype-note",
					children: "Student profile stored in the institution roster. Risk projections are rule-based scenarios, not predictions from a trained model."
				})
			]
		})
	});
}
function InterventionFollowUp({ intervention, save }) {
	const [dueDate, setDueDate] = (0, import_react.useState)(intervention.dueDate ?? "");
	const [notes, setNotes] = (0, import_react.useState)(intervention.notes ?? "");
	const [completionOutcome, setCompletionOutcome] = (0, import_react.useState)(intervention.completionOutcome ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDueDate(intervention.dueDate ?? "");
		setNotes(intervention.notes ?? "");
		setCompletionOutcome(intervention.completionOutcome ?? "");
		setSaved(false);
	}, [
		intervention.dueDate,
		intervention.notes,
		intervention.completionOutcome
	]);
	const submit = async (event) => {
		event.preventDefault();
		setSaving(true);
		setSaved(false);
		try {
			setSaved(await save(intervention, {
				dueDate: dueDate || null,
				notes: notes.trim(),
				completionOutcome: completionOutcome.trim()
			}));
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "intervention-follow-up",
		onSubmit: (event) => void submit(event),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Due date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "select-control",
				type: "date",
				value: dueDate,
				onChange: (event) => {
					setDueDate(event.target.value);
					setSaved(false);
				}
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Follow-up notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "select-control",
				rows: 2,
				maxLength: 2e3,
				value: notes,
				onChange: (event) => {
					setNotes(event.target.value);
					setSaved(false);
				},
				placeholder: "Add follow-up notes"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Completion outcome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "select-control",
				rows: 2,
				maxLength: 1e3,
				value: completionOutcome,
				onChange: (event) => {
					setCompletionOutcome(event.target.value);
					setSaved(false);
				},
				placeholder: "Record the outcome when complete"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "outline",
					size: "sm",
					disabled: saving,
					children: saving ? "Saving..." : "Save follow-up"
				}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "follow-up-saved",
					role: "status",
					children: "Saved"
				})]
			})
		]
	});
}
function StrideDashboard() {
	const navigate = useNavigate();
	const [access, setAccess] = (0, import_react.useState)("checking");
	const [user, setUser] = (0, import_react.useState)(null);
	const [accessMessage, setAccessMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const client = supabase;
		if (!client) {
			setAccess("error");
			setAccessMessage("Supabase is not configured. Add the project URL and publishable key.");
			return;
		}
		let active = true;
		let accessChannel;
		const { data } = client.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_OUT") navigate({ to: "/login" });
		});
		client.auth.getSession().then(async ({ data: sessionData, error }) => {
			if (error) throw error;
			const session = sessionData.session;
			if (!session) {
				await navigate({ to: "/login" });
				return;
			}
			const { data: membership, error: membershipError } = await client.from("staff_access").select("is_active").eq("user_id", session.user.id).maybeSingle();
			if (membershipError) throw membershipError;
			if (!active) return;
			setUser({
				id: session.user.id,
				email: session.user.email ?? null
			});
			if (membership?.is_active) {
				setAccess("approved");
				accessChannel = client.channel(`staff-access-${session.user.id}`).on("postgres_changes", {
					event: "*",
					schema: "public",
					table: "staff_access",
					filter: `user_id=eq.${session.user.id}`
				}, (payload) => {
					if (payload.eventType === "DELETE" || !payload.new["is_active"]) {
						setUser(null);
						setAccess("unapproved");
					}
				}).subscribe();
			} else setAccess("unapproved");
		}).catch((cause) => {
			console.error("Unable to verify staff access:", cause);
			if (!active) return;
			setAccess("error");
			setAccessMessage(cause instanceof Error ? `${cause.message}. Make sure the approved-staff database migration is applied.` : "Staff access could not be verified. Please contact your administrator.");
		});
		return () => {
			active = false;
			data.subscription.unsubscribe();
			if (accessChannel) client.removeChannel(accessChannel);
		};
	}, [navigate]);
	if (access !== "approved" || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "staff-access-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "staff-access-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "staff-access-icon" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: access === "unapproved" ? "Access requires approval" : access === "error" ? "Unable to verify access" : "Verifying staff access" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: access === "unapproved" ? "Your account does not have active staff access. Ask your Stride administrator to approve your account." : access === "error" ? accessMessage : "Checking your institution access before loading student records." }),
				(access === "unapproved" || access === "error") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => void navigate({ to: "/login" }),
					children: "Back to sign in"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardWorkspace, {
		userEmail: user.email,
		userId: user.id
	});
}
function DashboardWorkspace({ userEmail, userId }) {
	const navigate = useNavigate();
	const [view, setView] = (0, import_react.useState)("Overview");
	const [department, setDepartment] = (0, import_react.useState)("All departments");
	const [semester, setSemester] = (0, import_react.useState)("");
	const [academicYear, setAcademicYear] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [riskFilter, setRiskFilter] = (0, import_react.useState)("All risk levels");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [plansError, setPlansError] = (0, import_react.useState)("");
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [notificationsError, setNotificationsError] = (0, import_react.useState)("");
	const [notificationOpen, setNotificationOpen] = (0, import_react.useState)(false);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [studentFormOpen, setStudentFormOpen] = (0, import_react.useState)(false);
	const [editingStudent, setEditingStudent] = (0, import_react.useState)(null);
	const { students: liveStudents, loading: studentsLoading, error: studentsError, lastUpdated, refresh: refreshStudents, setError: setStudentsError } = useStudentRecords(true);
	(0, import_react.useEffect)(() => {
		const client = supabase;
		const recipientEmail = userEmail?.trim().toLowerCase();
		if (!client || !recipientEmail) return;
		let active = true;
		const loadPlans = async () => {
			const { data, error } = await client.from("interventions").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			if (active) {
				setPlans(data.map(interventionFromRow));
				setPlansError("");
			}
		};
		const loadNotifications = async () => {
			const { data, error } = await client.from("intervention_notifications").select("*").eq("recipient_email", recipientEmail).order("created_at", { ascending: false }).limit(50);
			if (error) throw error;
			if (active) {
				setNotifications(data);
				setNotificationsError("");
			}
		};
		loadPlans().catch((cause) => {
			console.error("Unable to load intervention assignments:", cause);
			if (active) setPlansError(cause instanceof Error ? cause.message : "Interventions could not be loaded.");
		});
		loadNotifications().catch((cause) => {
			console.error("Unable to load intervention notifications:", cause);
			if (active) setNotificationsError(cause instanceof Error ? cause.message : "Notifications could not be loaded.");
		});
		const plansChannel = client.channel("live-interventions").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "interventions"
		}, () => {
			loadPlans().catch((cause) => {
				console.error("Unable to refresh intervention assignments:", cause);
				if (active) setPlansError("Interventions could not be refreshed.");
			});
		}).subscribe((status) => {
			if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
				console.error("Intervention realtime updates are unavailable:", status);
				if (active) setPlansError("Live intervention updates are unavailable. Reload to retry.");
			}
		});
		const notificationsChannel = client.channel(`intervention-notifications-${recipientEmail}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "intervention_notifications",
			filter: `recipient_email=eq.${recipientEmail}`
		}, () => {
			loadNotifications().catch((cause) => {
				console.error("Unable to refresh intervention notifications:", cause);
				if (active) setNotificationsError("Notifications could not be refreshed.");
			});
		}).subscribe((status) => {
			if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
				console.error("Notification realtime updates are unavailable:", status);
				if (active) setNotificationsError("Live notifications are unavailable. Reload to retry.");
			}
		});
		return () => {
			active = false;
			client.removeChannel(plansChannel);
			client.removeChannel(notificationsChannel);
		};
	}, [userEmail]);
	const ranked = [...liveStudents].sort((a, b) => riskScore(b) - riskScore(a));
	const academicYears = [...new Set(liveStudents.map((student) => student.academicYear).filter((year) => Boolean(year)))].sort((a, b) => b.localeCompare(a));
	const go = (v) => {
		setView(v);
		setSidebarOpen(false);
		setNotice("");
	};
	const signOut = async () => {
		if (!supabase) {
			await navigate({ to: "/login" });
			return;
		}
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			console.error("Unable to sign out:", error);
			setNotice("Unable to sign out. Please try again.");
		}
	};
	const filtered = ranked.filter((s) => (department === "All departments" || s.department === department) && (!semester || s.semester === Number(semester)) && (!academicYear || s.academicYear === academicYear) && `${s.name} ${s.id}`.toLowerCase().includes(search.toLowerCase()) && (riskFilter === "All risk levels" || riskLevel(riskScore(s)) === riskFilter));
	const highCount = filtered.filter((s) => riskLevel(riskScore(s)) === "high").length;
	const assign = async (intervention) => {
		if (!supabase) throw new Error("Supabase is not configured.");
		const counsellorEmail = intervention.counsellorEmail?.trim().toLowerCase();
		if (!counsellorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(counsellorEmail)) throw new Error("Enter a valid email address for the assigned counsellor.");
		const { data, error } = await supabase.from("interventions").insert({
			student_id: intervention.studentId,
			student_name: intervention.student,
			action: intervention.action,
			counsellor: intervention.counsellor,
			counsellor_email: counsellorEmail,
			assigned_by: userId,
			due_date: intervention.dueDate ?? null,
			notes: intervention.notes ?? "",
			completion_outcome: intervention.completionOutcome ?? null
		}).select("*").single();
		if (error) throw error;
		setPlans((current) => [interventionFromRow(data), ...current]);
		const { data: emailResult, error: emailError } = await supabase.functions.invoke("send-intervention-notification", { body: { interventionId: data.id } });
		if (emailError) {
			console.error("Intervention was assigned, but its email notification failed:", emailError);
			return {
				emailSent: false,
				emailError: emailError.message
			};
		}
		if (!emailResult?.emailSent) {
			console.error("Intervention email function returned without confirming delivery:", emailResult);
			return {
				emailSent: false,
				emailError: "The email service did not confirm delivery."
			};
		}
		return { emailSent: true };
	};
	const markNotificationRead = async (notificationId) => {
		if (!supabase) return;
		const { error } = await supabase.from("intervention_notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", notificationId);
		if (error) {
			console.error("Unable to mark notification as read:", error);
			setNotificationsError(error.message);
			return;
		}
		setNotifications((current) => current.map((notification) => notification.id === notificationId ? {
			...notification,
			read_at: (/* @__PURE__ */ new Date()).toISOString()
		} : notification));
	};
	const updateInterventionStatus = async (intervention) => {
		if (!supabase || !intervention.id) {
			setPlansError("This intervention is missing its database ID. Reload and try again.");
			return;
		}
		const status = intervention.status === "Planned" ? "In progress" : intervention.status === "In progress" ? "Completed" : "Completed";
		const { error } = await supabase.from("interventions").update({ status }).eq("id", intervention.id);
		if (error) {
			console.error("Unable to update intervention status:", error);
			setPlansError(error.message);
			return;
		}
		setPlans((current) => current.map((item) => item.id === intervention.id ? {
			...item,
			status
		} : item));
		setPlansError("");
	};
	const updateInterventionFollowUp = async (intervention, followUp) => {
		if (!supabase || !intervention.id) {
			setPlansError("This intervention is missing its database ID. Reload and try again.");
			return false;
		}
		const { error } = await supabase.from("interventions").update({
			due_date: followUp.dueDate,
			notes: followUp.notes,
			completion_outcome: followUp.completionOutcome || null
		}).eq("id", intervention.id);
		if (error) {
			console.error("Unable to save intervention follow-up:", error);
			setPlansError(getInterventionErrorMessage(error));
			return false;
		}
		setPlans((current) => current.map((item) => item.id === intervention.id ? {
			...item,
			dueDate: followUp.dueDate,
			notes: followUp.notes,
			completionOutcome: followUp.completionOutcome || null
		} : item));
		setPlansError("");
		return true;
	};
	const unreadNotifications = notifications.filter((notification) => !notification.read_at).length;
	const leavingHigh = [...new Set(plans.map((p) => p.studentId))].map((id) => liveStudents.find((s) => s.id === id)).filter((s) => Boolean(s)).filter((s) => riskScore(s) >= 60 && riskScore(s, Math.max(s.attendance, 90)) < 60).length;
	const moderateCount = filtered.filter((s) => riskLevel(riskScore(s)) === "moderate").length;
	const nearThresholdCount = filtered.filter((s) => {
		const score = riskScore(s);
		return score >= 55 && score < 60;
	}).length;
	const highRiskStudents = filtered.filter((s) => riskLevel(riskScore(s)) === "high");
	const highRiskLowAttendance = highRiskStudents.filter((s) => s.attendance < 75).length;
	const attendanceRiskPercent = highRiskStudents.length ? Math.round(highRiskLowAttendance / highRiskStudents.length * 100) : 0;
	const departmentRisk = [...new Set(filtered.map((s) => s.department))].map((name) => ({
		name,
		count: filtered.filter((s) => s.department === name && riskLevel(riskScore(s)) === "high").length
	})).sort((a, b) => b.count - a.count)[0];
	const saveStudentRecord = async (record) => {
		if (!supabase) throw new Error("Supabase is not configured.");
		const payload = studentToRow(record);
		const result = editingStudent ? await supabase.from("students").update(payload).eq("student_id", editingStudent.id).select("student_id").maybeSingle() : await supabase.from("students").insert({
			...payload,
			created_by: userId
		}).select("student_id").single();
		if (result.error) throw result.error;
		if (!result.data) throw new Error("No record was updated. It may have been removed or access revoked.");
		setDepartment(payload.department);
		setSemester(String(payload.semester));
		setAcademicYear(payload.academic_year);
		setSearch("");
		setRiskFilter("All risk levels");
		setSelected(null);
		setEditingStudent(null);
		setStudentFormOpen(false);
		setNotice(editingStudent ? "Student record updated." : "Student added to the live roster.");
		try {
			await refreshStudents();
		} catch (error) {
			console.error("Student record saved, but the roster refresh failed:", error);
			setNotice("Student record saved, but the roster could not refresh. Retry to load the update.");
			return;
		}
	};
	const importStudentRecords = async (records) => {
		if (!supabase) throw new Error("Supabase is not configured.");
		const first = records[0];
		if (!first) throw new Error("The import file contains no student records.");
		const { error } = await supabase.from("students").insert(records.map((record) => ({
			...studentToRow(record),
			created_by: userId
		})));
		if (error) throw error;
		const semesters = new Set(records.map((record) => record.semester));
		const departments = new Set(records.map((record) => record.department));
		const academicYears = new Set(records.map((record) => record.academic_year));
		setSemester(semesters.size === 1 ? String(first.semester) : "");
		setDepartment(departments.size === 1 ? first.department : "All departments");
		setAcademicYear(academicYears.size === 1 ? first.academic_year : "");
		setSearch("");
		setRiskFilter("All risk levels");
		setSelected(null);
		setEditingStudent(null);
		setNotice(`${records.length} student ${records.length === 1 ? "record was" : "records were"} imported.`);
		try {
			await refreshStudents();
		} catch (cause) {
			console.error("Student records imported, but the roster refresh failed:", cause);
			setNotice("Student records imported, but the roster could not refresh. Retry to load the update.");
		}
	};
	const exportReport = () => {
		const csv = ["Student ID,Name,Department,Academic year,Semester,Attendance,Risk score,Risk level", ...filtered.map((s) => `${s.id},${s.name},${s.department},${s.academicYear},${s.semester},${s.attendance},${riskScore(s)},${riskLevel(riskScore(s))}`)].join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "stride-student-risk-report.csv";
		a.click();
		URL.revokeObjectURL(url);
		setNotice("The current student roster has been exported.");
	};
	const table = (limit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "table-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Student" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Department" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Risk score ↓" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Key risk factors" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.slice(0, limit).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "student-cell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "student-avatar",
					children: s.initials
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "link",
					className: "h-auto p-0 text-foreground",
					onClick: () => setSelected(s),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: s.name })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
					s.id,
					" · ",
					s.year
				] })] })]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.department }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { score: riskScore(s) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "factor-tags",
				children: riskFactors(s).filter((f) => f.value >= 7).slice(0, 2).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "factor-tag",
					children: f.name
				}, f.name))
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				className: "assign-button",
				onClick: () => setSelected(s),
				children: [plans.some((p) => p.studentId === s.id) ? "View plan" : "Assign intervention", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })]
			}) })
		] }, s.id)) })] }), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "empty-state",
			children: "No students match these filters."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "table-footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			"Showing ",
			Math.min(limit ?? filtered.length, filtered.length),
			" of ",
			filtered.length,
			" student records"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			onClick: () => go("Students"),
			children: ["View all students ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
		})]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `sidebar ${sidebarOpen ? "is-open" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "close-sidebar",
						"aria-label": "Close navigation",
						onClick: () => setSidebarOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "workspace-label",
						children: "Workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "nav-stack",
						"aria-label": "Main navigation",
						children: navItems.map(({ name, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: `side-link ${view === name ? "active" : ""}`,
							onClick: () => go(name),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
								name,
								name === "Interventions" && plans.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "nav-count",
									children: plans.length
								})
							]
						}, name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sidebar-bottom",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "nav-stack",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									className: `side-link ${view === "Settings" ? "active" : ""}`,
									onClick: () => go("Settings"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {}), "Settings"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									className: "side-link",
									onClick: () => setNotice("For demo support, contact your institution’s student success coordinator."),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, {}), "Help & support"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "demo-note",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot" }), "Prototype environment"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Simulated data. Real possibilities.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Built for better student outcomes."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "institution",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "institution-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stride Institute" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Administrator workspace" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										size: 13,
										className: "ml-auto"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "main-shell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "topbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "breadcrumb",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "mobile-menu",
								"aria-label": "Open navigation",
								onClick: () => setSidebarOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workspace" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 13 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: view })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "top-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "global-search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										"aria-label": "Search students",
										placeholder: "Search students, insights...",
										value: search,
										onChange: (e) => {
											setSearch(e.target.value);
											setView("Students");
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "⌘ K" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								className: "notification",
								"aria-label": "Notifications",
								onClick: () => setNotificationOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}), unreadNotifications > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "notification-count",
									"aria-label": `${unreadNotifications} unread`,
									children: unreadNotifications > 9 ? "9+" : unreadNotifications
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 border-l border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "user-avatar border-0 p-0",
								title: userEmail ? `Signed in as ${userEmail} — sign out` : "Sign in",
								"aria-label": userEmail ? `Sign out ${userEmail}` : "Sign in",
								onClick: () => void signOut(),
								children: userEmail ? userEmail.slice(0, 2).toUpperCase() : "DN"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "page-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "page-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: view === "Overview" ? "Student success, at a glance" : view === "Risk analytics" ? "Understand every risk signal" : view === "Students" ? "Every student. One unified view." : view === "Interventions" ? "Turn insight into action" : view === "Data sources" ? "Connected data. Clearer outcomes." : "Workspace settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: view === "Overview" ? "See who needs support. Understand why. Make the next step count." : view === "Students" ? "Student records entered by approved staff and scored using transparent rules." : view === "Interventions" ? "A coordinated support plan for the students who need it most." : view === "Risk analytics" ? "Transparent, weighted risk scores with every contributing factor." : view === "Data sources" ? "Live Supabase roster protected by approved-staff access rules." : "Your institution and rules-based risk scoring configuration." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "heading-tools",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "select-control",
										"aria-label": "Academic year",
										value: academicYear,
										onChange: (event) => setAcademicYear(event.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All academic years"
										}), academicYears.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: year,
											children: year
										}, year))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "select-control",
										"aria-label": "Department",
										value: department,
										onChange: (e) => setDepartment(e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All departments" }), [...new Set(liveStudents.map((s) => s.department))].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "select-control",
										"aria-label": "Semester",
										value: semester,
										onChange: (e) => {
											setSemester(e.target.value);
											setNotice("Showing student records from the selected semester.");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All semesters"
										}), Array.from({ length: 8 }, (_, index) => index + 1).map((number) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: number,
											children: ["Semester ", number]
										}, number))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										onClick: exportReport,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Export report"]
									})
								]
							})]
						}),
						(notice || studentsError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "notice",
							role: "status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center gap-3",
								children: [studentsError || notice, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Dismiss notification",
									onClick: () => {
										setNotice("");
										setStudentsError("");
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "status-strip",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "status-strip-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "status-pill",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot" }), "Supabase student roster"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "muted",
									children: studentsLoading ? "Loading student records..." : studentsError ? "Student records need attention" : `Live updates${lastUpdated ? ` · refreshed ${lastUpdated}` : ""}`
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "muted flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 12 }), academicYear || "All academic years"]
							})]
						}),
						(view === "Overview" || view === "Risk analytics") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stats-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-top",
											children: ["Total students", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "stat-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "stat-value",
											children: filtered.length
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-foot",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "positive flex gap-1 items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "positive",
													children: filtered.length
												})]
											}), "current semester records"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card high-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-top",
											children: ["High-risk students", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "stat-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-value",
											children: [highCount, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "stat-badge",
												children: [Math.round(highCount / (filtered.length || 1) * 100), "% of cohort"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-foot",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "positive" }), "of current records"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card medium-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-top",
											children: ["Moderate-risk students", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "stat-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "stat-value",
											children: moderateCount
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-foot",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "moderate flex gap-1 items-center",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
													Math.round(moderateCount / (filtered.length || 1) * 100),
													"%"
												]
											}), "of current records"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-card green-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-top",
											children: ["Active interventions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "stat-icon",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "stat-value",
											children: plans.length
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "stat-foot",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "positive" }), "saved assignments"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "analytics-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "panel-heading",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Student risk map ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "info-icon" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "panel-sub",
											children: "Each dot is a saved student record, plotted by attendance and risk."
										})] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskPlot, {
										students: filtered,
										onSelect: setSelected
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "risk-legend",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "legend-items",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-dot high" }), "High risk (60–100)"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-dot moderate" }), "Moderate (35–59)"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-dot low" }), "Low risk (0–34)"] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "muted",
											children: [filtered.length, " live records"]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel-heading",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											size: 15,
											className: "text-primary"
										}), "Actionable insights"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "status-pill",
											children: filtered.length ? "Live roster" : "No records"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "insight-list",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "insight-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "insight-symbol",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Attendance among high-risk students" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
														highRiskLowAttendance,
														" of ",
														highRiskStudents.length,
														" high-risk records have attendance below 75% (",
														attendanceRiskPercent,
														"%)."
													] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "link",
														className: "insight-link",
														onClick: () => {
															setRiskFilter("high");
															go("Students");
														},
														children: ["Explore students ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "insight-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "insight-symbol",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [nearThresholdCount, " students near the high-risk threshold"] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These live records currently score 55–59 on the weighted rules-based model." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "link",
														className: "insight-link",
														onClick: () => {
															setRiskFilter("All risk levels");
															go("Students");
														},
														children: ["Review watchlist ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "insight-item",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "insight-symbol",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: departmentRisk ? `High-risk records in ${departmentRisk.name}` : "No department data yet" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: departmentRisk ? `${departmentRisk.count} high-risk student records in this department.` : "Add approved student records to see roster insights." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "link",
														className: "insight-link",
														onClick: () => {
															if (departmentRisk) setDepartment(departmentRisk.name);
															go("Students");
														},
														children: ["View department ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
													})
												] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "insight-footer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 11 }), "Insights calculated from the live roster; scores are rule-based, not predictions."]
									})
								]
							})]
						})] }),
						(view === "Overview" || view === "Students" || view === "Risk analytics") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "panel priority-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
										view === "Students" ? "Student directory" : "Students who need your attention",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "risk-badge",
											children: highCount
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "panel-sub",
										children: "Prioritized by risk score. A little support can change their story."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "priority-toolbar",
										children: [
											view === "Students" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentCsvImport, { onImport: importStudentRecords }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												onClick: () => {
													setEditingStudent(null);
													setStudentFormOpen(true);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), "Add student"]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												"aria-label": "Filter high-risk students",
												onClick: () => setRiskFilter(riskFilter === "high" ? "All risk levels" : "high"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {}), "Filter"]
											}),
											view === "Students" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												"aria-label": "Risk level",
												className: "select-control",
												value: riskFilter,
												onChange: (e) => setRiskFilter(e.target.value),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All risk levels" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "high",
														children: "High risk"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "moderate",
														children: "Moderate risk"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "low",
														children: "Low risk"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												"aria-label": "More student options",
												onClick: () => go("Students"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
											})
										]
									})]
								}),
								view === "Students" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-5 pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "cohort-search",
										"aria-label": "Find a student",
										placeholder: "Search by name or student ID",
										value: search,
										onChange: (e) => setSearch(e.target.value)
									})
								}),
								studentsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "empty-state",
									role: "status",
									children: "Loading student records..."
								}) : studentsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "empty-state",
									role: "alert",
									children: ["Student records could not be loaded.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "mt-3",
										onClick: () => void refreshStudents(),
										children: "Retry"
									})]
								}) : liveStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "empty-state",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto mb-3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "justify-center mb-2",
											children: "No student records yet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add a student to populate the live directory, risk scores, and analytics." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "mt-3",
											onClick: () => {
												setEditingStudent(null);
												setStudentFormOpen(true);
											},
											children: "Add first student"
										})
									]
								}) : table(view === "Overview" ? 5 : void 0)
							]
						}),
						view === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bottom-grid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "panel",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Planned interventions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "panel-sub",
										children: "Assignments made in this dashboard session"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
										size: 17,
										className: "text-risk-low"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "impact-body",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "impact-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											viewBox: "0 0 100 100",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "50",
												cy: "50",
												r: "42",
												className: "ring-track"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "50",
												cy: "50",
												r: "42",
												className: "ring-value"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ring-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plans.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "plans" })]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "impact-details",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "current assignments" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"Intervention assignments are held for this browser session. ",
												leavingHigh,
												" ",
												"assigned student",
												leavingHigh === 1 ? "" : "s",
												" could move below high risk in the 90% attendance scenario."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "impact-line",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [highCount, " high risk"] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.max(0, highCount - leavingHigh), " scenario"] })
												]
											})
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcesPanel, { recordCount: liveStudents.length })]
						}),
						view === "Data sources" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcesPanel, { recordCount: liveStudents.length }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "panel mt-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "panel-heading",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Source matching overview" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "table-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Roster source" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Record key" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Student records" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Staff-entered Supabase roster" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Student ID" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: liveStudents.length }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "status-pill",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }), "Live · access-controlled"]
										}) })
									] }) })] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "source-footer",
									children: "These records are entered by approved staff; no institutional systems are imported."
								})
							]
						})] }),
						view === "Interventions" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "notice",
								children: [
									plans.length,
									" assignments · ",
									leavingHigh,
									" students could leave high risk in a 90% attendance scenario."
								]
							}),
							plansError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "notice",
								role: "alert",
								children: plansError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "panel",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Intervention plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => {
											setSelected(ranked[0] ?? null);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}), "Assign intervention"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "table-container",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Student" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Intervention" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Counsellor" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Follow-up tracking" })
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.student }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.action }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											title: p.counsellorEmail,
											children: p.counsellor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "status-pill",
											children: p.status
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void updateInterventionStatus(p),
											disabled: p.status === "Completed",
											children: p.status === "Planned" ? "Start" : p.status === "In progress" ? "Complete" : "Completed"
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterventionFollowUp, {
											intervention: p,
											save: updateInterventionFollowUp
										}) })
									] }, p.id ?? `${p.studentId}-${p.action}`)) })] }), plans.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "empty-state",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "mx-auto mb-3" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "justify-center mb-2",
												children: "A fresh start for every student"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No interventions assigned in this session." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												className: "mt-3",
												onClick: () => go("Students"),
												children: ["Find students to support", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
											})
										]
									})]
								})]
							})
						] }),
						view === "Settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "panel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Prototype configuration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 18,
									className: "text-primary"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "detail-metrics",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "detail-metric",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Institution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "!text-sm",
													children: "Stride Institute"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "detail-metric",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Academic year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "!text-sm",
													children: "2026–27"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "detail-metric",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Scoring model" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "!text-sm",
													children: "Weighted rules"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "detail-section mt-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Risk factor weights" }), students.slice(0, 1).flatMap((s) => riskFactors(s)).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "factor-row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-auto",
												children: [f.weight, "%"]
											})]
										}, f.name))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "prototype-note",
										children: "Student records are entered by approved staff and stored in Supabase. Risk scores use transparent weighted rules, not a trained predictive model. Intervention assignments currently last for this browser session."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "page-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Stride · Every student deserves a way forward." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 11 }), "Live staff-entered roster · Transparent weighted scoring"]
							})]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentDetails, {
				student: selected,
				close: () => setSelected(null),
				assign,
				edit: (student) => {
					setEditingStudent(student);
					setStudentFormOpen(true);
				}
			}, selected.id),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: notificationOpen,
				onOpenChange: setNotificationOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "student-record-dialog",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Intervention notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Notifications addressed to ",
						userEmail ?? "your account",
						"."
					] })] }), notificationsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "student-record-error",
						role: "alert",
						children: notificationsError
					}) : notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "prototype-note",
						children: "No intervention notifications yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "notification-list",
						children: notifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `notification-item ${notification.read_at ? "" : "unread"}`,
							onClick: () => {
								if (!notification.read_at) markNotificationRead(notification.id);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: notification.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: notification.body }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [new Date(notification.created_at).toLocaleString(), notification.read_at ? " · Read" : " · Mark as read"] })
							]
						}, notification.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentRecordForm, {
				student: editingStudent,
				open: studentFormOpen,
				onOpenChange: (open) => {
					setStudentFormOpen(open);
					if (!open) setEditingStudent(null);
				},
				onSave: saveStudentRecord
			}, editingStudent?.id ?? "new-student")
		]
	});
}
function SourcesPanel({ recordCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Institution student roster" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "panel-sub",
					children: "Staff-entered records, stored in Supabase"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
					size: 16,
					className: "text-muted-foreground"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sources-body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "source-chip",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
							recordCount,
							" student records"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "source-chip",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Approved staff access"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "source-chip",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}), "Realtime roster updates"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "source-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					"Records matched by student ID ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto positive",
						children: "Connected roster"
					})
				]
			})
		]
	});
}
var SplitComponent = StrideDashboard;
//#endregion
export { SplitComponent as component };
