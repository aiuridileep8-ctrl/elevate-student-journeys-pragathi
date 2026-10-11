import { defineMcp } from "@lovable.dev/mcp-js";
import listStudents from "./tools/list-students";
import getStudentRisk from "./tools/get-student-risk";

export default defineMcp({
  name: "elevate-student-journeys",
  title: "Elevate Student Journeys",
  version: "0.1.0",
  instructions: "Read-only tools for Pragati's simulated student success data (not real students). List students by risk level, then explain an individual's rule-based risk score.",
  tools: [listStudents, getStudentRisk],
});
