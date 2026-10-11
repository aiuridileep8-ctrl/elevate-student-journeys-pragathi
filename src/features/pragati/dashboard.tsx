import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  Activity,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  Filter,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Database as DbSchema } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { StudentRecordForm } from "./student-record-form";
import { StudentCsvImport } from "./student-csv-import";
import { useStudentRecords } from "./use-student-records";
import { studentToRow, type StudentRecordInput } from "./student-repository";
import {
  students,
  riskScore,
  riskFactors,
  riskLevel,
  recommendations,
  type Student,
  type Intervention,
} from "./data";

type InterventionRow = DbSchema["public"]["Tables"]["interventions"]["Row"];
type InterventionNotification = DbSchema["public"]["Tables"]["intervention_notifications"]["Row"];

type View =
  "Overview" | "Students" | "Risk analytics" | "Interventions" | "Data sources" | "Settings";
const navItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Students", icon: Users },
  { name: "Risk analytics", icon: Activity },
  { name: "Interventions", icon: Target },
  { name: "Data sources", icon: Database },
] as const;
function Brand() {
  return (
    <div>
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        stride<span className="text-primary">.</span>
      </div>
      <div className="brand-sub">EVERY STUDENT. A STEP FORWARD.</div>
    </div>
  );
}
function RiskBadge({ score }: { score: number }) {
  const level = riskLevel(score);
  return (
    <span className={`risk-badge ${level}`}>
      <span className={`legend-dot ${level}`} />
      {score}{" "}
      <span className="font-normal">
        {level === "high" ? "High" : level === "moderate" ? "Moderate" : "Low"}
      </span>
    </span>
  );
}
function interventionFromRow(row: InterventionRow): Intervention {
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
    completionOutcome: row.completion_outcome,
  };
}
function dateAfterDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function getInterventionErrorMessage(cause: unknown): string {
  if (cause && typeof cause === "object" && "code" in cause && cause.code === "PGRST205") {
    return "The intervention database tables are missing. Run supabase/migrations/20261010233000_intervention_notifications.sql in the Supabase SQL Editor, then retry.";
  }
  if (
    cause &&
    typeof cause === "object" &&
    "code" in cause &&
    (cause.code === "PGRST204" || cause.code === "42703")
  ) {
    return "The follow-up database columns are missing. Run supabase/migrations/20261011004700_intervention_follow_up.sql in the Supabase SQL Editor, then retry.";
  }
  if (
    cause &&
    typeof cause === "object" &&
    "message" in cause &&
    typeof cause.message === "string"
  ) {
    return cause.message;
  }
  if (cause instanceof Error) return cause.message;
  return "The intervention could not be assigned.";
}
function RiskPlot({
  students,
  onSelect,
}: {
  students: Student[];
  onSelect: (student: Student) => void;
}) {
  return (
    <div className="risk-plot">
      <span className="plot-y-title">Student risk score</span>
      <svg
        className="plot-svg"
        viewBox="0 0 530 200"
        role="img"
        aria-label="Simulated cohort risk distribution by attendance and risk score"
      >
        {[20, 60, 100, 140, 180].map((y, i) => (
          <g key={y}>
            <line x1="38" y1={y} x2="515" y2={y} className="plot-grid" />
            <text x="27" y={y + 3} textAnchor="end" className="plot-text">
              {100 - i * 25}
            </text>
          </g>
        ))}
        {[40, 135, 230, 325, 420, 515].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="20" x2={x} y2="180" className="plot-grid" />
            <text x={x} y="198" textAnchor="middle" className="plot-text">
              {i * 20}%
            </text>
          </g>
        ))}
        {students.map((s) => (
          <circle
            key={s.id}
            cx={38 + s.attendance * 4.77}
            cy={180 - riskScore(s) * 1.6}
            r="5"
            className={`plot-point plot-${riskLevel(riskScore(s))}`}
            role="button"
            tabIndex={0}
            aria-label={`View ${s.name}`}
            onClick={() => onSelect(s)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(s);
            }}
          >
            <title>{`${s.name}: risk ${riskScore(s)}, attendance ${s.attendance}%`}</title>
          </circle>
        ))}
      </svg>
      <p className="plot-axis-title">Attendance rate</p>
    </div>
  );
}
function StudentDetails({
  student,
  close,
  assign,
  edit,
}: {
  student: Student;
  close: () => void;
  assign: (i: Intervention) => Promise<{ emailSent: boolean; emailError?: string }>;
  edit: (student: Student) => void;
}) {
  const [attendance, setAttendance] = useState(student.attendance);
  const [action, setAction] = useState(recommendations[0] ?? "Guardian outreach");
  const [counsellor, setCounsellor] = useState("Dr. Meera Krishnan");
  const [counsellorEmail, setCounsellorEmail] = useState("");
  const [dueDate, setDueDate] = useState(() => dateAfterDays(7));
  const [assigned, setAssigned] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assignmentMessage, setAssignmentMessage] = useState("");
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
  return (
    <div className="detail-overlay" onClick={close}>
      <section
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${student.name} student profile`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="detail-title">
          <h2>Unified student profile</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => edit(student)}>
              Edit record
            </Button>
            <Button variant="ghost" size="icon" aria-label="Close profile" onClick={close}>
              <X />
            </Button>
          </div>
        </div>
        <div className="detail-profile">
          <div className="student-avatar">{student.initials}</div>
          <div>
            <h2>{student.name}</h2>
            <p>
              {student.id} · {student.department} · {student.year}
            </p>
          </div>
        </div>
        <div className="detail-metrics">
          <div className="detail-metric">
            <small>Attendance</small>
            <strong>{student.attendance}%</strong>
          </div>
          <div className="detail-metric">
            <small>Academic score</small>
            <strong>{student.grades}%</strong>
          </div>
          <div className="detail-metric">
            <small>Backlogs</small>
            <strong>{student.backlogs}</strong>
          </div>
        </div>
        <div className="detail-section">
          <h3>Explainable risk score</h3>
          <div className="flex items-center justify-between">
            <span className="detail-score">
              {riskScore(student)}
              <small className="text-sm text-muted-foreground font-normal"> / 100</small>
            </span>
            <RiskBadge score={riskScore(student)} />
          </div>
          {riskFactors(student).map((f) => (
            <div key={f.name} className="factor-row">
              <span>{f.name}</span>
              <div className="factor-track">
                <div
                  className="factor-fill"
                  style={{ "--factor-width": `${(f.value / 30) * 100}%` } as CSSProperties}
                />
              </div>
              <span className="w-10 text-right">+{f.value.toFixed(1)}</span>
            </div>
          ))}
          <p className="prototype-note">
            Transparent weighted scoring · Attendance 30%, academics 20%, backlogs 15%, assignments
            10%, fees 10%, engagement 10%, placement 5%.
          </p>
        </div>
        <div className="detail-section">
          <h3>What-if attendance simulator</h3>
          <div className="flex justify-between text-xs">
            <label htmlFor="attendance-range">Planned attendance</label>
            <strong>{attendance}%</strong>
          </div>
          <input
            id="attendance-range"
            className="simulation-control"
            type="range"
            min={student.attendance}
            max="100"
            value={attendance}
            onChange={(e) => setAttendance(Number(e.target.value))}
          />
          <div className="simulation-result">
            <span>
              Projected risk <strong>{riskScore(student, attendance)}</strong>
            </span>
            <span className="positive">
              ↓ {riskScore(student) - riskScore(student, attendance)} points
            </span>
          </div>
        </div>
        <div className="detail-section">
          <h3>Recommended intervention</h3>
          <label className="field-label" htmlFor="intervention-action">
            Intervention
          </label>
          <select
            id="intervention-action"
            className="select-control"
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setAssigned(false);
            }}
          >
            {recommendations.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <label className="field-label" htmlFor="counsellor">
            Assign to counsellor
          </label>
          <select
            id="counsellor"
            className="select-control"
            value={counsellor}
            onChange={(e) => setCounsellor(e.target.value)}
          >
            <option>Dr. Meera Krishnan</option>
            <option>Prof. Rajesh Kumar</option>
            <option>Ms. Aditi Rao</option>
          </select>
          <label className="field-label" htmlFor="counsellor-email">
            Assignee email
          </label>
          <input
            id="counsellor-email"
            className="select-control"
            type="email"
            autoComplete="email"
            required
            value={counsellorEmail}
            onChange={(event) => setCounsellorEmail(event.target.value)}
            placeholder="counsellor@institution.edu"
          />
          <label className="field-label" htmlFor="intervention-due-date">
            Follow-up due date
          </label>
          <input
            id="intervention-due-date"
            className="select-control"
            type="date"
            required
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
          <Button
            className="full-width"
            disabled={assigned || assigning || !counsellorEmail}
            onClick={() => {
              setAssigning(true);
              setAssignmentMessage("");
              void assign({
                studentId: student.id,
                student: student.name,
                action,
                counsellor,
                counsellorEmail,
                status: "Planned",
                dueDate,
                notes: "",
                completionOutcome: null,
              })
                .then(({ emailSent, emailError }) => {
                  setAssigned(true);
                  setAssignmentMessage(
                    emailSent
                      ? `Assigned to ${counsellor}. An in-app notification and email were sent.`
                      : `Assigned to ${counsellor} and an in-app notification was created, but the email could not be sent${emailError ? `: ${emailError}` : "."}`,
                  );
                })
                .catch((cause: unknown) => {
                  console.error("Unable to assign intervention:", cause);
                  setAssignmentMessage(getInterventionErrorMessage(cause));
                })
                .finally(() => setAssigning(false));
            }}
          >
            {assigned ? <CheckCircle2 /> : <Target />}
            {assigning
              ? "Assigning..."
              : assigned
                ? "Intervention assigned"
                : "Assign intervention"}
          </Button>
          {assignmentMessage && (
            <p className="prototype-note" role={assigned ? "status" : "alert"}>
              {assignmentMessage}
            </p>
          )}
        </div>
        <p className="prototype-note">
          Student profile stored in the institution roster. Risk projections are rule-based
          scenarios, not predictions from a trained model.
        </p>
      </section>
    </div>
  );
}

function InterventionFollowUp({
  intervention,
  save,
}: {
  intervention: Intervention;
  save: (
    intervention: Intervention,
    followUp: { dueDate: string | null; notes: string; completionOutcome: string },
  ) => Promise<boolean>;
}) {
  const [dueDate, setDueDate] = useState(intervention.dueDate ?? "");
  const [notes, setNotes] = useState(intervention.notes ?? "");
  const [completionOutcome, setCompletionOutcome] = useState(intervention.completionOutcome ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDueDate(intervention.dueDate ?? "");
    setNotes(intervention.notes ?? "");
    setCompletionOutcome(intervention.completionOutcome ?? "");
    setSaved(false);
  }, [intervention.dueDate, intervention.notes, intervention.completionOutcome]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      setSaved(
        await save(intervention, {
          dueDate: dueDate || null,
          notes: notes.trim(),
          completionOutcome: completionOutcome.trim(),
        }),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="intervention-follow-up" onSubmit={(event) => void submit(event)}>
      <label>
        Due date
        <input
          className="select-control"
          type="date"
          value={dueDate}
          onChange={(event) => {
            setDueDate(event.target.value);
            setSaved(false);
          }}
        />
      </label>
      <label>
        Follow-up notes
        <textarea
          className="select-control"
          rows={2}
          maxLength={2000}
          value={notes}
          onChange={(event) => {
            setNotes(event.target.value);
            setSaved(false);
          }}
          placeholder="Add follow-up notes"
        />
      </label>
      <label>
        Completion outcome
        <textarea
          className="select-control"
          rows={2}
          maxLength={1000}
          value={completionOutcome}
          onChange={(event) => {
            setCompletionOutcome(event.target.value);
            setSaved(false);
          }}
          placeholder="Record the outcome when complete"
        />
      </label>
      <div className="flex items-center gap-2">
        <Button type="submit" variant="outline" size="sm" disabled={saving}>
          {saving ? "Saving..." : "Save follow-up"}
        </Button>
        {saved && (
          <span className="follow-up-saved" role="status">
            Saved
          </span>
        )}
      </div>
    </form>
  );
}

export function StrideDashboard() {
  const navigate = useNavigate();
  const [access, setAccess] = useState<"checking" | "signed-in" | "error">("checking");
  const [user, setUser] = useState<{ id: string; email: string | null } | null>(null);
  const [accessMessage, setAccessMessage] = useState("");

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setAccess("error");
      setAccessMessage("Supabase is not configured. Add the project URL and publishable key.");
      return;
    }
    let active = true;
    const { data } = client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") void navigate({ to: "/login" });
    });

    void client.auth
      .getSession()
      .then(async ({ data: sessionData, error }) => {
        if (error) throw error;
        const session = sessionData.session;
        if (!session) {
          await navigate({ to: "/login" });
          return;
        }
        if (!active) return;

        setUser({ id: session.user.id, email: session.user.email ?? null });
        setAccess("signed-in");
      })
      .catch((cause: unknown) => {
        console.error("Unable to verify signed-in access:", cause);
        if (!active) return;
        setAccess("error");
        setAccessMessage(
          cause instanceof Error
            ? cause.message
            : "Your sign-in could not be verified. Please sign in again.",
        );
      });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  if (access !== "signed-in" || !user) {
    return (
      <main className="staff-access-page">
        <section className="staff-access-card">
          <ShieldCheck className="staff-access-icon" />
          <h1>{access === "error" ? "Unable to verify sign-in" : "Verifying your sign-in"}</h1>
          <p>
            {access === "error"
              ? accessMessage
              : "Checking your account before loading the dashboard."}
          </p>
          {access === "error" && (
            <Button variant="outline" onClick={() => void navigate({ to: "/login" })}>
              Back to sign in
            </Button>
          )}
        </section>
      </main>
    );
  }

  return <DashboardWorkspace userEmail={user.email} userId={user.id} />;
}

function DashboardWorkspace({ userEmail, userId }: { userEmail: string | null; userId: string }) {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("Overview");
  const [department, setDepartment] = useState("All departments");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All risk levels");
  const [selected, setSelected] = useState<Student | null>(null);
  const [plans, setPlans] = useState<Intervention[]>([]);
  const [plansError, setPlansError] = useState("");
  const [notifications, setNotifications] = useState<InterventionNotification[]>([]);
  const [notificationsError, setNotificationsError] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [studentFormOpen, setStudentFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const {
    students: liveStudents,
    loading: studentsLoading,
    error: studentsError,
    lastUpdated,
    refresh: refreshStudents,
    setError: setStudentsError,
  } = useStudentRecords(true);
  useEffect(() => {
    const client = supabase;
    const recipientEmail = userEmail?.trim().toLowerCase();
    if (!client || !recipientEmail) return;

    let active = true;
    const loadPlans = async () => {
      const { data, error } = await client
        .from("interventions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (active) {
        setPlans(data.map(interventionFromRow));
        setPlansError("");
      }
    };
    const loadNotifications = async () => {
      const { data, error } = await client
        .from("intervention_notifications")
        .select("*")
        .eq("recipient_email", recipientEmail)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      if (active) {
        setNotifications(data);
        setNotificationsError("");
      }
    };

    void loadPlans().catch((cause: unknown) => {
      console.error("Unable to load intervention assignments:", cause);
      if (active) {
        setPlansError(
          cause instanceof Error ? cause.message : "Interventions could not be loaded.",
        );
      }
    });
    void loadNotifications().catch((cause: unknown) => {
      console.error("Unable to load intervention notifications:", cause);
      if (active) {
        setNotificationsError(
          cause instanceof Error ? cause.message : "Notifications could not be loaded.",
        );
      }
    });

    const plansChannel = client
      .channel("live-interventions")
      .on("postgres_changes", { event: "*", schema: "public", table: "interventions" }, () => {
        void loadPlans().catch((cause: unknown) => {
          console.error("Unable to refresh intervention assignments:", cause);
          if (active) setPlansError("Interventions could not be refreshed.");
        });
      })
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("Intervention realtime updates are unavailable:", status);
          if (active) setPlansError("Live intervention updates are unavailable. Reload to retry.");
        }
      });
    const notificationsChannel = client
      .channel(`intervention-notifications-${recipientEmail}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "intervention_notifications",
          filter: `recipient_email=eq.${recipientEmail}`,
        },
        () => {
          void loadNotifications().catch((cause: unknown) => {
            console.error("Unable to refresh intervention notifications:", cause);
            if (active) setNotificationsError("Notifications could not be refreshed.");
          });
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.error("Notification realtime updates are unavailable:", status);
          if (active) {
            setNotificationsError("Live notifications are unavailable. Reload to retry.");
          }
        }
      });

    return () => {
      active = false;
      void client.removeChannel(plansChannel);
      void client.removeChannel(notificationsChannel);
    };
  }, [userEmail]);
  const ranked = [...liveStudents].sort((a, b) => riskScore(b) - riskScore(a));
  const academicYears = [
    ...new Set(
      liveStudents
        .map((student) => student.academicYear)
        .filter((year): year is string => Boolean(year)),
    ),
  ].sort((a, b) => b.localeCompare(a));
  const go = (v: View) => {
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
  const filtered = ranked.filter(
    (s) =>
      (department === "All departments" || s.department === department) &&
      (!semester || s.semester === Number(semester)) &&
      (!academicYear || s.academicYear === academicYear) &&
      `${s.name} ${s.id}`.toLowerCase().includes(search.toLowerCase()) &&
      (riskFilter === "All risk levels" || riskLevel(riskScore(s)) === riskFilter),
  );
  const highCount = filtered.filter((s) => riskLevel(riskScore(s)) === "high").length;
  const assign = async (
    intervention: Intervention,
  ): Promise<{ emailSent: boolean; emailError?: string }> => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const counsellorEmail = intervention.counsellorEmail?.trim().toLowerCase();
    if (!counsellorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(counsellorEmail)) {
      throw new Error("Enter a valid email address for the assigned counsellor.");
    }
    const { data, error } = await supabase
      .from("interventions")
      .insert({
        student_id: intervention.studentId,
        student_name: intervention.student,
        action: intervention.action,
        counsellor: intervention.counsellor,
        counsellor_email: counsellorEmail,
        assigned_by: userId,
        due_date: intervention.dueDate ?? null,
        notes: intervention.notes ?? "",
        completion_outcome: intervention.completionOutcome ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    setPlans((current) => [interventionFromRow(data), ...current]);

    const { data: emailResult, error: emailError } = await supabase.functions.invoke(
      "send-intervention-notification",
      { body: { interventionId: data.id } },
    );
    if (emailError) {
      console.error("Intervention was assigned, but its email notification failed:", emailError);
      return { emailSent: false, emailError: emailError.message };
    }
    if (!emailResult?.emailSent) {
      console.error(
        "Intervention email function returned without confirming delivery:",
        emailResult,
      );
      return {
        emailSent: false,
        emailError: "The email service did not confirm delivery.",
      };
    }
    return { emailSent: true };
  };
  const markNotificationRead = async (notificationId: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("intervention_notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notificationId);
    if (error) {
      console.error("Unable to mark notification as read:", error);
      setNotificationsError(error.message);
      return;
    }
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read_at: new Date().toISOString() }
          : notification,
      ),
    );
  };
  const updateInterventionStatus = async (intervention: Intervention) => {
    if (!supabase || !intervention.id) {
      setPlansError("This intervention is missing its database ID. Reload and try again.");
      return;
    }
    const status =
      intervention.status === "Planned"
        ? "In progress"
        : intervention.status === "In progress"
          ? "Completed"
          : "Completed";
    const { error } = await supabase
      .from("interventions")
      .update({ status })
      .eq("id", intervention.id);
    if (error) {
      console.error("Unable to update intervention status:", error);
      setPlansError(error.message);
      return;
    }
    setPlans((current) =>
      current.map((item) => (item.id === intervention.id ? { ...item, status } : item)),
    );
    setPlansError("");
  };
  const updateInterventionFollowUp = async (
    intervention: Intervention,
    followUp: { dueDate: string | null; notes: string; completionOutcome: string },
  ): Promise<boolean> => {
    if (!supabase || !intervention.id) {
      setPlansError("This intervention is missing its database ID. Reload and try again.");
      return false;
    }
    const { error } = await supabase
      .from("interventions")
      .update({
        due_date: followUp.dueDate,
        notes: followUp.notes,
        completion_outcome: followUp.completionOutcome || null,
      })
      .eq("id", intervention.id);
    if (error) {
      console.error("Unable to save intervention follow-up:", error);
      setPlansError(getInterventionErrorMessage(error));
      return false;
    }
    setPlans((current) =>
      current.map((item) =>
        item.id === intervention.id
          ? {
              ...item,
              dueDate: followUp.dueDate,
              notes: followUp.notes,
              completionOutcome: followUp.completionOutcome || null,
            }
          : item,
      ),
    );
    setPlansError("");
    return true;
  };
  const unreadNotifications = notifications.filter((notification) => !notification.read_at).length;
  const plannedStudents = [...new Set(plans.map((p) => p.studentId))]
    .map((id) => liveStudents.find((s) => s.id === id))
    .filter((s): s is Student => Boolean(s));
  const leavingHigh = plannedStudents.filter(
    (s) => riskScore(s) >= 60 && riskScore(s, Math.max(s.attendance, 90)) < 60,
  ).length;
  const moderateCount = filtered.filter((s) => riskLevel(riskScore(s)) === "moderate").length;
  const nearThresholdCount = filtered.filter((s) => {
    const score = riskScore(s);
    return score >= 55 && score < 60;
  }).length;
  const highRiskStudents = filtered.filter((s) => riskLevel(riskScore(s)) === "high");
  const highRiskLowAttendance = highRiskStudents.filter((s) => s.attendance < 75).length;
  const attendanceRiskPercent = highRiskStudents.length
    ? Math.round((highRiskLowAttendance / highRiskStudents.length) * 100)
    : 0;
  const departmentRisk = [...new Set(filtered.map((s) => s.department))]
    .map((name) => ({
      name,
      count: filtered.filter((s) => s.department === name && riskLevel(riskScore(s)) === "high")
        .length,
    }))
    .sort((a, b) => b.count - a.count)[0];
  const saveStudentRecord = async (record: StudentRecordInput) => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const payload = studentToRow(record);
    const result = editingStudent
      ? await supabase
          .from("students")
          .update(payload)
          .eq("student_id", editingStudent.id)
          .select("student_id")
          .maybeSingle()
      : await supabase
          .from("students")
          .insert({ ...payload, created_by: userId })
          .select("student_id")
          .single();
    if (result.error) throw result.error;
    if (!result.data) {
      throw new Error("No record was updated. It may have been removed or access revoked.");
    }
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
      setNotice(
        "Student record saved, but the roster could not refresh. Retry to load the update.",
      );
      return;
    }
  };
  const importStudentRecords = async (records: StudentRecordInput[]) => {
    if (!supabase) throw new Error("Supabase is not configured.");
    const first = records[0];
    if (!first) throw new Error("The import file contains no student records.");
    const { error } = await supabase.from("students").insert(
      records.map((record) => ({
        ...studentToRow(record),
        created_by: userId,
      })),
    );
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
    setNotice(
      `${records.length} student ${records.length === 1 ? "record was" : "records were"} imported.`,
    );
    try {
      await refreshStudents();
    } catch (cause) {
      console.error("Student records imported, but the roster refresh failed:", cause);
      setNotice(
        "Student records imported, but the roster could not refresh. Retry to load the update.",
      );
    }
  };
  const exportReport = () => {
    const csv = [
      "Student ID,Name,Department,Academic year,Semester,Attendance,Risk score,Risk level",
      ...filtered.map(
        (s) =>
          `${s.id},${s.name},${s.department},${s.academicYear},${s.semester},${s.attendance},${riskScore(s)},${riskLevel(riskScore(s))}`,
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "stride-student-risk-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("The current student roster has been exported.");
  };
  const table = (limit?: number) => (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Department</th>
              <th>Risk score ↓</th>
              <th>Key risk factors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, limit).map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">{s.initials}</div>
                    <div>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-foreground"
                        onClick={() => setSelected(s)}
                      >
                        <strong>{s.name}</strong>
                      </Button>
                      <small>
                        {s.id} · {s.year}
                      </small>
                    </div>
                  </div>
                </td>
                <td>{s.department}</td>
                <td>
                  <RiskBadge score={riskScore(s)} />
                </td>
                <td>
                  <div className="factor-tags">
                    {riskFactors(s)
                      .filter((f) => f.value >= 7)
                      .slice(0, 2)
                      .map((f) => (
                        <span className="factor-tag" key={f.name}>
                          {f.name}
                        </span>
                      ))}
                  </div>
                </td>
                <td>
                  <Button variant="ghost" className="assign-button" onClick={() => setSelected(s)}>
                    {plans.some((p) => p.studentId === s.id) ? "View plan" : "Assign intervention"}
                    <ArrowUpRight className="size-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">No students match these filters.</div>
        )}
      </div>
      <div className="table-footer">
        <span>
          Showing {Math.min(limit ?? filtered.length, filtered.length)} of {filtered.length} student
          records
        </span>
        <Button variant="ghost" onClick={() => go("Students")}>
          View all students <ArrowRight />
        </Button>
      </div>
    </>
  );
  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <Button
          variant="ghost"
          size="icon"
          className="close-sidebar"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        >
          <X />
        </Button>
        <Brand />
        <div className="workspace-label">Workspace</div>
        <nav className="nav-stack" aria-label="Main navigation">
          {navItems.map(({ name, icon: Icon }) => (
            <Button
              key={name}
              variant="ghost"
              className={`side-link ${view === name ? "active" : ""}`}
              onClick={() => go(name)}
            >
              <Icon />
              {name}
              {name === "Interventions" && plans.length > 0 && (
                <span className="nav-count">{plans.length}</span>
              )}
            </Button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="nav-stack">
            <Button
              variant="ghost"
              className={`side-link ${view === "Settings" ? "active" : ""}`}
              onClick={() => go("Settings")}
            >
              <Settings2 />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="side-link"
              onClick={() =>
                setNotice(
                  "For demo support, contact your institution’s student success coordinator.",
                )
              }
            >
              <LifeBuoy />
              Help & support
            </Button>
          </div>
          <div className="demo-note">
            <strong>
              <span className="live-dot" />
              Prototype environment
            </strong>
            <p>
              Simulated data. Real possibilities.
              <br />
              Built for better student outcomes.
            </p>
          </div>
          <div className="institution">
            <div className="institution-icon">
              <Building2 size={18} />
            </div>
            <div>
              <strong>Stride Institute</strong>
              <small>Administrator workspace</small>
            </div>
            <ChevronDown size={13} className="ml-auto" />
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </Button>
            <span>Workspace</span>
            <ChevronRight size={13} />
            <span>{view}</span>
          </div>
          <div className="top-actions">
            <label className="global-search">
              <Search />
              <input
                aria-label="Search students"
                placeholder="Search students, insights..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setView("Students");
                }}
              />
              <kbd>⌘ K</kbd>
            </label>
            <Button
              variant="ghost"
              size="icon"
              className="notification"
              aria-label="Notifications"
              onClick={() => setNotificationOpen(true)}
            >
              <Bell />
              {unreadNotifications > 0 && (
                <span className="notification-count" aria-label={`${unreadNotifications} unread`}>
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </span>
              )}
            </Button>
            <div className="h-6 border-l border-border" />
            <button
              type="button"
              className="user-avatar border-0 p-0"
              title={userEmail ? `Signed in as ${userEmail} — sign out` : "Sign in"}
              aria-label={userEmail ? `Sign out ${userEmail}` : "Sign in"}
              onClick={() => void signOut()}
            >
              {userEmail ? userEmail.slice(0, 2).toUpperCase() : "DN"}
            </button>
          </div>
        </header>
        <main className="page-content">
          <div className="page-heading">
            <div>
              <h1>
                {view === "Overview"
                  ? "Student success, at a glance"
                  : view === "Risk analytics"
                    ? "Understand every risk signal"
                    : view === "Students"
                      ? "Every student. One unified view."
                      : view === "Interventions"
                        ? "Turn insight into action"
                        : view === "Data sources"
                          ? "Connected data. Clearer outcomes."
                          : "Workspace settings"}
              </h1>
              <p>
                {view === "Overview"
                  ? "See who needs support. Understand why. Make the next step count."
                  : view === "Students"
                    ? "Student records entered by signed-in users and scored using transparent rules."
                    : view === "Interventions"
                      ? "A coordinated support plan for the students who need it most."
                      : view === "Risk analytics"
                        ? "Transparent, weighted risk scores with every contributing factor."
                        : view === "Data sources"
                          ? "Live Supabase roster available to confirmed accounts during evaluation."
                          : "Your institution and rules-based risk scoring configuration."}
              </p>
            </div>
            <div className="heading-tools">
              <select
                className="select-control"
                aria-label="Academic year"
                value={academicYear}
                onChange={(event) => setAcademicYear(event.target.value)}
              >
                <option value="">All academic years</option>
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="select-control"
                aria-label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option>All departments</option>
                {[...new Set(liveStudents.map((s) => s.department))].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                className="select-control"
                aria-label="Semester"
                value={semester}
                onChange={(e) => {
                  setSemester(e.target.value);
                  setNotice("Showing student records from the selected semester.");
                }}
              >
                <option value="">All semesters</option>
                {Array.from({ length: 8 }, (_, index) => index + 1).map((number) => (
                  <option key={number} value={number}>
                    Semester {number}
                  </option>
                ))}
              </select>
              <Button variant="outline" onClick={exportReport}>
                <Download />
                Export report
              </Button>
            </div>
          </div>
          {(notice || studentsError) && (
            <div className="notice" role="status">
              <div className="flex justify-between items-center gap-3">
                {studentsError || notice}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Dismiss notification"
                  onClick={() => {
                    setNotice("");
                    setStudentsError("");
                  }}
                >
                  <X />
                </Button>
              </div>
            </div>
          )}
          <div className="status-strip">
            <div className="status-strip-left">
              <span className="status-pill">
                <span className="live-dot" />
                Supabase student roster
              </span>
              <span className="muted">
                {studentsLoading
                  ? "Loading student records..."
                  : studentsError
                    ? "Student records need attention"
                    : `Live updates${lastUpdated ? ` · refreshed ${lastUpdated}` : ""}`}
              </span>
            </div>
            <span className="muted flex items-center gap-1.5">
              <CalendarDays size={12} />
              {academicYear || "All academic years"}
            </span>
          </div>
          {(view === "Overview" || view === "Risk analytics") && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-top">
                    Total students
                    <span className="stat-icon">
                      <Users />
                    </span>
                  </div>
                  <div className="stat-value">{filtered.length}</div>
                  <div className="stat-foot">
                    <span className="positive flex gap-1 items-center">
                      <ArrowUpRight />
                      <span className="positive">{filtered.length}</span>
                    </span>
                    current semester records
                  </div>
                </div>
                <div className="stat-card high-card">
                  <div className="stat-top">
                    High-risk students
                    <span className="stat-icon">
                      <Activity />
                    </span>
                  </div>
                  <div className="stat-value">
                    {highCount}
                    <span className="stat-badge">
                      {Math.round((highCount / (filtered.length || 1)) * 100)}% of cohort
                    </span>
                  </div>
                  <div className="stat-foot">
                    <TrendingDown className="positive" />
                    of current records
                  </div>
                </div>
                <div className="stat-card medium-card">
                  <div className="stat-top">
                    Moderate-risk students
                    <span className="stat-icon">
                      <ShieldCheck />
                    </span>
                  </div>
                  <div className="stat-value">{moderateCount}</div>
                  <div className="stat-foot">
                    <span className="moderate flex gap-1 items-center">
                      <Activity />
                      {Math.round((moderateCount / (filtered.length || 1)) * 100)}%
                    </span>
                    of current records
                  </div>
                </div>
                <div className="stat-card green-card">
                  <div className="stat-top">
                    Active interventions
                    <span className="stat-icon">
                      <Target />
                    </span>
                  </div>
                  <div className="stat-value">{plans.length}</div>
                  <div className="stat-foot">
                    <CheckCircle2 className="positive" />
                    saved assignments
                  </div>
                </div>
              </div>
              <div className="analytics-grid">
                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>
                        Student risk map <CircleHelp className="info-icon" />
                      </h2>
                      <p className="panel-sub">
                        Each dot is a saved student record, plotted by attendance and risk.
                      </p>
                    </div>
                  </div>
                  <RiskPlot students={filtered} onSelect={setSelected} />
                  <div className="risk-legend">
                    <div className="legend-items">
                      <span>
                        <i className="legend-dot high" />
                        High risk (60–100)
                      </span>
                      <span>
                        <i className="legend-dot moderate" />
                        Moderate (35–59)
                      </span>
                      <span>
                        <i className="legend-dot low" />
                        Low risk (0–34)
                      </span>
                    </div>
                    <span className="muted">{filtered.length} live records</span>
                  </div>
                </section>
                <section className="panel">
                  <div className="panel-heading">
                    <h2>
                      <Sparkles size={15} className="text-primary" />
                      Actionable insights
                    </h2>
                    <span className="status-pill">
                      {filtered.length ? "Live roster" : "No records"}
                    </span>
                  </div>
                  <div className="insight-list">
                    <div className="insight-item">
                      <span className="insight-symbol">
                        <TrendingDown />
                      </span>
                      <div>
                        <strong>Attendance among high-risk students</strong>
                        <p>
                          {highRiskLowAttendance} of {highRiskStudents.length} high-risk records
                          have attendance below 75% ({attendanceRiskPercent}%).
                        </p>
                        <Button
                          variant="link"
                          className="insight-link"
                          onClick={() => {
                            setRiskFilter("high");
                            go("Students");
                          }}
                        >
                          Explore students <ArrowRight className="size-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="insight-item">
                      <span className="insight-symbol">
                        <Users />
                      </span>
                      <div>
                        <strong>{nearThresholdCount} students near the high-risk threshold</strong>
                        <p>
                          These live records currently score 55–59 on the weighted rules-based
                          model.
                        </p>
                        <Button
                          variant="link"
                          className="insight-link"
                          onClick={() => {
                            setRiskFilter("All risk levels");
                            go("Students");
                          }}
                        >
                          Review watchlist <ArrowRight className="size-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="insight-item">
                      <span className="insight-symbol">
                        <BookOpen />
                      </span>
                      <div>
                        <strong>
                          {departmentRisk
                            ? `High-risk records in ${departmentRisk.name}`
                            : "No department data yet"}
                        </strong>
                        <p>
                          {departmentRisk
                            ? `${departmentRisk.count} high-risk student records in this department.`
                            : "Add approved student records to see roster insights."}
                        </p>
                        <Button
                          variant="link"
                          className="insight-link"
                          onClick={() => {
                            if (departmentRisk) setDepartment(departmentRisk.name);
                            go("Students");
                          }}
                        >
                          View department <ArrowRight className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="insight-footer">
                    <Sparkles size={11} />
                    Insights calculated from the live roster; scores are rule-based, not
                    predictions.
                  </div>
                </section>
              </div>
            </>
          )}
          {(view === "Overview" || view === "Students" || view === "Risk analytics") && (
            <section className="panel priority-panel">
              <div className="panel-heading">
                <div>
                  <h2>
                    {view === "Students" ? "Student directory" : "Students who need your attention"}{" "}
                    <span className="risk-badge">{highCount}</span>
                  </h2>
                  <p className="panel-sub">
                    Prioritized by risk score. A little support can change their story.
                  </p>
                </div>
                <div className="priority-toolbar">
                  {view === "Students" && (
                    <>
                      <StudentCsvImport onImport={importStudentRecords} />
                      <Button
                        onClick={() => {
                          setEditingStudent(null);
                          setStudentFormOpen(true);
                        }}
                      >
                        <Users />
                        Add student
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    aria-label="Filter high-risk students"
                    onClick={() =>
                      setRiskFilter(riskFilter === "high" ? "All risk levels" : "high")
                    }
                  >
                    <Filter />
                    Filter
                  </Button>
                  {view === "Students" ? (
                    <select
                      aria-label="Risk level"
                      className="select-control"
                      value={riskFilter}
                      onChange={(e) => setRiskFilter(e.target.value)}
                    >
                      <option>All risk levels</option>
                      <option value="high">High risk</option>
                      <option value="moderate">Moderate risk</option>
                      <option value="low">Low risk</option>
                    </select>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="More student options"
                      onClick={() => go("Students")}
                    >
                      <MoreHorizontal />
                    </Button>
                  )}
                </div>
              </div>
              {view === "Students" && (
                <div className="px-5 pt-4">
                  <input
                    className="cohort-search"
                    aria-label="Find a student"
                    placeholder="Search by name or student ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              )}
              {studentsLoading ? (
                <div className="empty-state" role="status">
                  Loading student records...
                </div>
              ) : studentsError ? (
                <div className="empty-state" role="alert">
                  Student records could not be loaded.
                  <Button variant="outline" className="mt-3" onClick={() => void refreshStudents()}>
                    Retry
                  </Button>
                </div>
              ) : liveStudents.length === 0 ? (
                <div className="empty-state">
                  <Users className="mx-auto mb-3" />
                  <h2 className="justify-center mb-2">No student records yet</h2>
                  <p>Add a student to populate the live directory, risk scores, and analytics.</p>
                  <Button
                    className="mt-3"
                    onClick={() => {
                      setEditingStudent(null);
                      setStudentFormOpen(true);
                    }}
                  >
                    Add first student
                  </Button>
                </div>
              ) : (
                table(view === "Overview" ? 5 : undefined)
              )}
            </section>
          )}
          {view === "Overview" && (
            <div className="bottom-grid">
              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h2>Planned interventions</h2>
                    <p className="panel-sub">Assignments made in this dashboard session</p>
                  </div>
                  <Target size={17} className="text-risk-low" />
                </div>
                <div className="impact-body">
                  <div className="impact-ring">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" className="ring-track" />
                      <circle cx="50" cy="50" r="42" className="ring-value" />
                    </svg>
                    <div className="ring-center">
                      <strong>{plans.length}</strong>
                      <small>plans</small>
                    </div>
                  </div>
                  <div className="impact-details">
                    <strong>current assignments</strong>
                    <p>
                      Intervention assignments are held for this browser session. {leavingHigh}{" "}
                      assigned student{leavingHigh === 1 ? "" : "s"} could move below high risk in
                      the 90% attendance scenario.
                    </p>
                    <div className="impact-line">
                      <span>{highCount} high risk</span>
                      <ArrowRight />
                      <span>{Math.max(0, highCount - leavingHigh)} scenario</span>
                    </div>
                  </div>
                </div>
              </section>
              <SourcesPanel recordCount={liveStudents.length} />
            </div>
          )}
          {view === "Data sources" && (
            <>
              <SourcesPanel recordCount={liveStudents.length} />
              <section className="panel mt-5">
                <div className="panel-heading">
                  <h2>Source matching overview</h2>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Roster source</th>
                        <th>Record key</th>
                        <th>Student records</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Staff-entered Supabase roster</td>
                        <td>Student ID</td>
                        <td>{liveStudents.length}</td>
                        <td>
                          <span className="status-pill">
                            <Check size={12} />
                            Live · access-controlled
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="source-footer">
                  These records are entered by signed-in users; no institutional systems are
                  imported. Production access will be restricted to approved staff.
                </div>
              </section>
            </>
          )}
          {view === "Interventions" && (
            <>
              <div className="notice">
                {plans.length} assignments · {leavingHigh} students could leave high risk in a 90%
                attendance scenario.
              </div>
              {plansError && (
                <div className="notice" role="alert">
                  {plansError}
                </div>
              )}
              <section className="panel">
                <div className="panel-heading">
                  <h2>Intervention plan</h2>
                  <Button
                    onClick={() => {
                      setSelected(ranked[0] ?? null);
                    }}
                  >
                    <Target />
                    Assign intervention
                  </Button>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Intervention</th>
                        <th>Counsellor</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Follow-up tracking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((p) => (
                        <tr key={p.id ?? `${p.studentId}-${p.action}`}>
                          <td>{p.student}</td>
                          <td>{p.action}</td>
                          <td title={p.counsellorEmail}>{p.counsellor}</td>
                          <td>
                            <span className="status-pill">{p.status}</span>
                          </td>
                          <td>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => void updateInterventionStatus(p)}
                              disabled={p.status === "Completed"}
                            >
                              {p.status === "Planned"
                                ? "Start"
                                : p.status === "In progress"
                                  ? "Complete"
                                  : "Completed"}
                            </Button>
                          </td>
                          <td>
                            <InterventionFollowUp
                              intervention={p}
                              save={updateInterventionFollowUp}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {plans.length === 0 && (
                    <div className="empty-state">
                      <Target className="mx-auto mb-3" />
                      <h2 className="justify-center mb-2">A fresh start for every student</h2>
                      <p>No interventions assigned in this session.</p>
                      <Button variant="outline" className="mt-3" onClick={() => go("Students")}>
                        Find students to support
                        <ArrowRight />
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
          {view === "Settings" && (
            <section className="panel">
              <div className="panel-heading">
                <h2>Prototype configuration</h2>
                <ShieldCheck size={18} className="text-primary" />
              </div>
              <div className="p-5">
                <div className="detail-metrics">
                  <div className="detail-metric">
                    <small>Institution</small>
                    <strong className="!text-sm">Stride Institute</strong>
                  </div>
                  <div className="detail-metric">
                    <small>Academic year</small>
                    <strong className="!text-sm">2026–27</strong>
                  </div>
                  <div className="detail-metric">
                    <small>Scoring model</small>
                    <strong className="!text-sm">Weighted rules</strong>
                  </div>
                </div>
                <div className="detail-section mt-5">
                  <h3>Risk factor weights</h3>
                  {students
                    .slice(0, 1)
                    .flatMap((s) => riskFactors(s))
                    .map((f) => (
                      <div className="factor-row" key={f.name}>
                        <span>{f.name}</span>
                        <span className="ml-auto">{f.weight}%</span>
                      </div>
                    ))}
                </div>
                <p className="prototype-note">
                  Student records are stored in Supabase and are open to confirmed accounts during
                  evaluation. Production access will be restricted to approved staff. Risk scores
                  use transparent weighted rules, not a trained predictive model.
                </p>
              </div>
            </section>
          )}
          <footer className="page-footer">
            <span>© 2026 Stride · Every student deserves a way forward.</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={11} />
              Live staff-entered roster · Transparent weighted scoring
            </span>
          </footer>
        </main>
      </div>
      {selected && (
        <StudentDetails
          key={selected.id}
          student={selected}
          close={() => setSelected(null)}
          assign={assign}
          edit={(student) => {
            setEditingStudent(student);
            setStudentFormOpen(true);
          }}
        />
      )}
      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent className="student-record-dialog">
          <DialogHeader>
            <DialogTitle>Intervention notifications</DialogTitle>
            <DialogDescription>
              Notifications addressed to {userEmail ?? "your account"}.
            </DialogDescription>
          </DialogHeader>
          {notificationsError ? (
            <p className="student-record-error" role="alert">
              {notificationsError}
            </p>
          ) : notifications.length === 0 ? (
            <p className="prototype-note">No intervention notifications yet.</p>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  className={`notification-item ${notification.read_at ? "" : "unread"}`}
                  onClick={() => {
                    if (!notification.read_at) void markNotificationRead(notification.id);
                  }}
                >
                  <strong>{notification.title}</strong>
                  <span>{notification.body}</span>
                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                    {notification.read_at ? " · Read" : " · Mark as read"}
                  </small>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <StudentRecordForm
        key={editingStudent?.id ?? "new-student"}
        student={editingStudent}
        open={studentFormOpen}
        onOpenChange={(open) => {
          setStudentFormOpen(open);
          if (!open) setEditingStudent(null);
        }}
        onSave={saveStudentRecord}
      />
    </div>
  );
}
function SourcesPanel({ recordCount }: { recordCount: number }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Institution student roster</h2>
          <p className="panel-sub">Staff-entered records, stored in Supabase</p>
        </div>
        <Database size={16} className="text-muted-foreground" />
      </div>
      <div className="sources-body">
        <span className="source-chip">
          <CheckCircle2 />
          {recordCount} student records
        </span>
        <span className="source-chip">
          <ShieldCheck />
          Approved staff access
        </span>
        <span className="source-chip">
          <Activity />
          Realtime roster updates
        </span>
      </div>
      <div className="source-footer">
        <ShieldCheck />
        Records matched by student ID <span className="ml-auto positive">Connected roster</span>
      </div>
    </section>
  );
}
