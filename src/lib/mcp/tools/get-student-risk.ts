import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { students, riskFactors, riskScore, riskLevel } from "@/features/pragati/data";

export default defineTool({
  name: "get_student_risk",
  title: "Explain student risk",
  description: "Get a simulated student's full profile and the weighted factor breakdown behind their risk score.",
  inputSchema: { studentId: z.string().min(1).describe("Student ID, e.g. PRG240108.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ studentId }) => {
    const s = students.find((x) => x.id.toLowerCase() === studentId.toLowerCase());
    if (!s) throw new ToolError(`No student with ID ${studentId}.`);
    const score = riskScore(s);
    const factors = riskFactors(s).map((f) => ({ name: f.name, weight: f.weight, contribution: Math.round(f.value * 10) / 10 }));
    const profile = { id: s.id, name: s.name, department: s.department, year: s.year, attendance: s.attendance, grades: s.grades, backlogs: s.backlogs, missedAssignments: s.missed, feeDues: s.fees === 1, engagement: s.engagement, placementReadiness: s.placement };
    return {
      content: [{ type: "text", text: `${s.name}: risk ${score} (${riskLevel(score)})\n` + factors.map((f) => `- ${f.name}: ${f.contribution} / ${f.weight}`).join("\n") }],
      structuredContent: { profile, riskScore: score, riskLevel: riskLevel(score), factors },
    };
  },
});
