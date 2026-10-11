import { createFileRoute } from "@tanstack/react-router";
import { StrideDashboard } from "@/features/pragati/dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stride — Student Success Overview" },
      {
        name: "description",
        content:
          "Review staff-entered student records, transparent risk scores, and support plans in Stride.",
      },
      { property: "og:title", content: "Stride — Student Success Overview" },
      {
        property: "og:description",
        content:
          "Every student. A step forward. Explainable risk scoring and coordinated student support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrideDashboard,
});
