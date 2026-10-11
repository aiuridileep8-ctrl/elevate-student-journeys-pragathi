export type Student = {
  id: string;
  name: string;
  initials: string;
  department: string;
  year: string;
  semester?: number;
  academicYear?: string;
  attendance: number;
  grades: number;
  backlogs: number;
  missed: number;
  fees: number;
  engagement: number;
  placement: number;
};
export const students: Student[] = [
  {
    id: "PRG240108",
    name: "Aarav Sharma",
    initials: "AS",
    department: "Computer Science",
    year: "3rd year",
    attendance: 48,
    grades: 38,
    backlogs: 3,
    missed: 6,
    fees: 1,
    engagement: 25,
    placement: 24,
  },
  {
    id: "PRG240216",
    name: "Priya Patel",
    initials: "PP",
    department: "Mechanical Eng.",
    year: "2nd year",
    attendance: 55,
    grades: 42,
    backlogs: 3,
    missed: 5,
    fees: 1,
    engagement: 32,
    placement: 28,
  },
  {
    id: "PRG240329",
    name: "Rohan Mehta",
    initials: "RM",
    department: "Electronics & Comm.",
    year: "3rd year",
    attendance: 58,
    grades: 45,
    backlogs: 3,
    missed: 5,
    fees: 0,
    engagement: 30,
    placement: 32,
  },
  {
    id: "PRG240412",
    name: "Sneha Reddy",
    initials: "SR",
    department: "Computer Science",
    year: "2nd year",
    attendance: 61,
    grades: 48,
    backlogs: 2,
    missed: 4,
    fees: 1,
    engagement: 36,
    placement: 38,
  },
  {
    id: "PRG240507",
    name: "Arjun Singh",
    initials: "AS",
    department: "Civil Engineering",
    year: "4th year",
    attendance: 63,
    grades: 52,
    backlogs: 2,
    missed: 4,
    fees: 0,
    engagement: 40,
    placement: 25,
  },
  {
    id: "PRG240621",
    name: "Ananya Iyer",
    initials: "AI",
    department: "Computer Science",
    year: "3rd year",
    attendance: 72,
    grades: 64,
    backlogs: 1,
    missed: 2,
    fees: 0,
    engagement: 55,
    placement: 58,
  },
  {
    id: "PRG240718",
    name: "Kabir Das",
    initials: "KD",
    department: "Mechanical Eng.",
    year: "2nd year",
    attendance: 92,
    grades: 86,
    backlogs: 0,
    missed: 0,
    fees: 0,
    engagement: 85,
    placement: 82,
  },
  {
    id: "PRG240823",
    name: "Diya Nair",
    initials: "DN",
    department: "Civil Engineering",
    year: "4th year",
    attendance: 88,
    grades: 80,
    backlogs: 0,
    missed: 1,
    fees: 0,
    engagement: 78,
    placement: 75,
  },
];
export function riskFactors(s: Student, attendance = s.attendance) {
  return [
    {
      name: "Low attendance",
      value: (100 - Math.min(100, Math.max(0, attendance))) * 0.3,
      weight: 30,
    },
    { name: "Falling grades", value: (100 - s.grades) * 0.2, weight: 20 },
    { name: "Uncleared backlogs", value: Math.min(s.backlogs / 3, 1) * 15, weight: 15 },
    { name: "Missed assignments", value: Math.min(s.missed / 6, 1) * 10, weight: 10 },
    { name: "Fee dues", value: s.fees * 10, weight: 10 },
    { name: "Low engagement", value: (100 - s.engagement) * 0.1, weight: 10 },
    { name: "Placement readiness", value: (100 - s.placement) * 0.05, weight: 5 },
  ];
}
export function riskScore(s: Student, attendance = s.attendance) {
  return Math.min(
    100,
    Math.max(0, Math.round(riskFactors(s, attendance).reduce((sum, f) => sum + f.value, 0))),
  );
}
export function riskLevel(score: number) {
  return score >= 60 ? "high" : score >= 35 ? "moderate" : "low";
}
export const sources = [
  "Academic records",
  "Attendance",
  "LMS activity",
  "Engagement",
  "Placement readiness",
  "Skills",
  "Course feedback",
];
export const recommendations = [
  "Guardian outreach",
  "Peer tutoring",
  "Backlog clearance plan",
  "Faculty mentoring",
  "Fee counselling",
];
export type Intervention = {
  id?: string;
  studentId: string;
  student: string;
  action: string;
  counsellor: string;
  counsellorEmail?: string;
  status: string;
  dueDate?: string | null;
  notes?: string;
  completionOutcome?: string | null;
};
