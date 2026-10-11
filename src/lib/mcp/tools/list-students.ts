import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { students, riskScore, riskLevel } from "@/features/pragati/data";

export default defineTool({
  name: "list_students",
  title: "List students",
  description: "List Pragati's simulated sample students with their risk score and level, optionally filtered by risk level.",
  inputSchema: { level: z.enum(["high", "moderate", "low"]).optional().describe("Only return students at this risk level.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ level }) => {
    const rows = students
      .map((s) => { const score = riskScore(s); return { id: s.id, name: s.name, department: s.department, year: s.year, riskScore: score, riskLevel: riskLevel(score) }; })
      .filter((r) => !level || r.riskLevel === level)
      .sort((a, b) => b.riskScore - a.riskScore);
    return {
      content: [{ type: "text", text: rows.map((r) => `${r.id} ${r.name} — ${r.riskScore} (${r.riskLevel})`).join("\n") || "No students." }],
      structuredContent: { students: rows },
    };
  },
});
