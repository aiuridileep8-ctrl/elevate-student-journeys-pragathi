import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as students, i as riskScore, n as riskFactors, r as riskLevel } from "./data-FbCW8h7b.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as ToolError, i as string, n as createTanStackOAuthProtectedResourceMetadataHandler, o as defineMcp, r as _enum, s as defineTool, t as createTanStackMcpHandler } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ChQi7iA0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B_88M_Gg.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Stride — Student Success" },
			{
				name: "description",
				content: "A unified view of student success, risk and interventions."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Stride — Student Success"
			},
			{
				property: "og:description",
				content: "A unified view of student success, risk and interventions."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$1 = () => import("./routes-DJmPuPu3.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Stride — Student Success Overview" },
		{
			name: "description",
			content: "Review staff-entered student records, transparent risk scores, and support plans in Stride."
		},
		{
			property: "og:title",
			content: "Stride — Student Success Overview"
		},
		{
			property: "og:description",
			content: "Every student. A step forward. Explainable risk scoring and coordinated student support."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./login-Bhwq7wNp.mjs");
var Route$2 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in — Stride" }, {
		name: "description",
		content: "Sign in to your Stride student success workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var list_students_default = defineTool({
	name: "list_students",
	title: "List students",
	description: "List Stride's simulated sample students with their risk score and level, optionally filtered by risk level.",
	inputSchema: { level: _enum([
		"high",
		"moderate",
		"low"
	]).optional().describe("Only return students at this risk level.") },
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: ({ level }) => {
		const rows = students.map((s) => {
			const score = riskScore(s);
			return {
				id: s.id,
				name: s.name,
				department: s.department,
				year: s.year,
				riskScore: score,
				riskLevel: riskLevel(score)
			};
		}).filter((r) => !level || r.riskLevel === level).sort((a, b) => b.riskScore - a.riskScore);
		return {
			content: [{
				type: "text",
				text: rows.map((r) => `${r.id} ${r.name} — ${r.riskScore} (${r.riskLevel})`).join("\n") || "No students."
			}],
			structuredContent: { students: rows }
		};
	}
});
var get_student_risk_default = defineTool({
	name: "get_student_risk",
	title: "Explain student risk",
	description: "Get a simulated student's full profile and the weighted factor breakdown behind their risk score.",
	inputSchema: { studentId: string().min(1).describe("Student ID, e.g. PRG240108.") },
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: ({ studentId }) => {
		const s = students.find((x) => x.id.toLowerCase() === studentId.toLowerCase());
		if (!s) throw new ToolError(`No student with ID ${studentId}.`);
		const score = riskScore(s);
		const factors = riskFactors(s).map((f) => ({
			name: f.name,
			weight: f.weight,
			contribution: Math.round(f.value * 10) / 10
		}));
		const profile = {
			id: s.id,
			name: s.name,
			department: s.department,
			year: s.year,
			attendance: s.attendance,
			grades: s.grades,
			backlogs: s.backlogs,
			missedAssignments: s.missed,
			feeDues: s.fees === 1,
			engagement: s.engagement,
			placementReadiness: s.placement
		};
		return {
			content: [{
				type: "text",
				text: `${s.name}: risk ${score} (${riskLevel(score)})\n` + factors.map((f) => `- ${f.name}: ${f.contribution} / ${f.weight}`).join("\n")
			}],
			structuredContent: {
				profile,
				riskScore: score,
				riskLevel: riskLevel(score),
				factors
			}
		};
	}
});
var mcp_default = defineMcp({
	name: "elevate-student-journeys",
	title: "Elevate Student Journeys",
	version: "0.1.0",
	instructions: "Read-only tools for Stride's simulated student success data (not real students). List students by risk level, then explain an individual's rule-based risk score.",
	tools: [list_students_default, get_student_risk_default]
});
var Route$1 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true,
	trustForwardedProto: true
}) } } });
var Route = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true,
	forwardedHostTrustedByPlatform: true,
	trustForwardedProto: true
}) } } });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	LoginRoute: Route$2.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$4
	}),
	McpRoute: Route$1.update({
		id: "/mcp",
		path: "/mcp",
		getParentRoute: () => Route$4
	}),
	Char91DotwellKnownChar93OauthProtectedResourceRoute: Route.update({
		id: "/.well-known/oauth-protected-resource",
		path: "/.well-known/oauth-protected-resource",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
