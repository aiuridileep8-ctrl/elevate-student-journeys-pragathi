import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-mcKfYQhL.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ArrowRight, d as LockKeyhole, g as EyeOff, h as Eye, o as ShieldCheck, u as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Bhwq7wNp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = (0, import_react.useState)(true);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [noticeType, setNoticeType] = (0, import_react.useState)("info");
	(0, import_react.useEffect)(() => {
		if (!supabase) return;
		const authClient = supabase;
		let active = true;
		const callbackParams = new URLSearchParams(`${window.location.search}&${window.location.hash.replace(/^#/, "")}`);
		const confirmationPending = callbackParams.has("confirmed") || callbackParams.get("type") === "signup";
		const confirmationHandled = { current: false };
		if (confirmationPending) {
			setNoticeType("success");
			setNotice("Your email is confirmed. Sign in with your email and password to continue.");
		}
		async function finishConfirmation() {
			if (!confirmationPending || confirmationHandled.current) return;
			confirmationHandled.current = true;
			try {
				const { error } = await authClient.auth.signOut({ scope: "local" });
				if (error) throw error;
				window.history.replaceState({}, document.title, window.location.pathname);
			} catch (error) {
				console.error("Unable to end the confirmation session:", error);
				if (active) {
					setNoticeType("error");
					setNotice("Your email is confirmed, but we couldn't end the confirmation session. Please sign out and try again.");
				}
			}
		}
		if (callbackParams.has("error")) {
			setNoticeType("info");
			setNotice(callbackParams.get("error_code") === "otp_expired" ? "This confirmation link has expired. Create a new account or ask for a fresh confirmation email." : "We couldn't verify that email link. Please request a fresh confirmation email.");
			window.history.replaceState({}, document.title, window.location.pathname);
		}
		const { data } = authClient.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_IN" && confirmationPending) finishConfirmation();
		});
		authClient.auth.getSession().then(({ data: sessionData, error }) => {
			if (error) {
				console.error("Unable to restore Supabase session:", error);
				if (active) {
					setNoticeType("error");
					setNotice("We couldn't verify your sign-in link. Please try signing in again.");
				}
				return;
			}
			if (active && sessionData.session) if (confirmationPending) finishConfirmation();
			else navigate({ to: "/" });
		});
		return () => {
			active = false;
			data.subscription.unsubscribe();
		};
	}, [navigate]);
	async function handleSubmit(event) {
		event.preventDefault();
		setNotice("");
		const form = event.currentTarget;
		const formData = new FormData(form);
		const email = String(formData.get("email") ?? "").trim();
		const password = String(formData.get("password") ?? "");
		if (!supabase) {
			setNoticeType("error");
			setNotice("Authentication is not configured. Add the Supabase URL and publishable key to your environment.");
			return;
		}
		setIsSubmitting(true);
		try {
			if (isLogin) {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) {
					if (error.message.toLowerCase().includes("email not confirmed")) {
						setNoticeType("info");
						setNotice("Check your inbox and confirm your email before signing in.");
						return;
					}
					throw error;
				}
				await navigate({ to: "/" });
			} else {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: `${window.location.origin}/login?confirmed=1` }
				});
				if (error) throw error;
				if (data.session) {
					const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
					if (signOutError) throw signOutError;
					setNoticeType("info");
					setNotice("Account created, but email confirmation is disabled. Enable Confirm email in your Supabase Auth settings before testing sign-in.");
				} else {
					setNoticeType("success");
					setNotice("Account created. Check your inbox to confirm your email, then sign in here.");
				}
				form.reset();
				setShowPassword(false);
				setIsLogin(true);
			}
		} catch (error) {
			setNoticeType("error");
			setNotice(error instanceof Error ? error.message : isLogin ? "Unable to sign in. Please try again." : "Unable to create your account. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "login-story",
			"aria-label": "About Stride",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "login-brand",
					"aria-label": "Stride home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "login-brand-mark",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["stride", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "login-brand-period",
						children: "."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-story-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "login-eyebrow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), " STUDENT SUCCESS, TOGETHER"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Every student has a next step." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bring insight, care, and timely support together in one place. Pick up where your student success team left off." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "login-quote",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "login-quote-mark",
									"aria-hidden": "true",
									children: "“"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Small, timely support can make a meaningful difference in a student’s journey." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE PRAGATI APPROACH" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "login-story-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Thoughtful support. Clearer journeys." })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "login-form-side",
			"aria-labelledby": "login-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "login-form-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "login-mobile-brand",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "login-brand-mark",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["stride", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "login-brand-period",
							children: "."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "login-heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "login-welcome",
								children: isLogin ? "WELCOME BACK" : "GET STARTED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "login-title",
								children: isLogin ? "Sign in to your workspace" : "Create your Stride account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isLogin ? "Enter your details to continue to Stride." : "Create an account with your email. We’ll send you a confirmation link." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "login-form",
						onSubmit: handleSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "login-email",
								children: "Work email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "login-input-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { "aria-hidden": "true" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "login-email",
									name: "email",
									type: "email",
									placeholder: "you@institution.edu",
									autoComplete: "email",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "login-password-label",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "login-password",
									children: "Password"
								}), isLogin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "login-text-button",
									type: "button",
									onClick: () => {
										setNoticeType("info");
										setNotice("To reset your password, contact your administrator.");
									},
									children: "Forgot password?"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "login-input-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { "aria-hidden": "true" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "login-password",
										name: "password",
										type: showPassword ? "text" : "password",
										placeholder: "Enter your password",
										autoComplete: isLogin ? "current-password" : "new-password",
										minLength: isLogin ? void 0 : 8,
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "login-password-toggle",
										type: "button",
										"aria-label": showPassword ? "Hide password" : "Show password",
										"aria-pressed": showPassword,
										onClick: () => setShowPassword((visible) => !visible),
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { "aria-hidden": "true" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "login-submit",
								type: "submit",
								disabled: isSubmitting,
								children: [isSubmitting ? "Please wait..." : isLogin ? "Sign in" : "Create account", !isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": "true" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `login-notice ${noticeType}`,
								role: "status",
								"aria-live": "polite",
								children: notice
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "login-help",
						children: [isLogin ? "New to Stride? " : "Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "login-text-button",
							type: "button",
							onClick: () => {
								setIsLogin((login) => !login);
								setNotice("");
							},
							children: isLogin ? "Create an account" : "Sign in"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "login-back-link",
						children: "Back to dashboard"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "login-footer",
				children: [
					"© 2026 Stride ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
					" Every student. A step forward."
				]
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
