import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Pragati" },
      { name: "description", content: "Sign in to your Pragati student success workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"error" | "success" | "info">("info");

  useEffect(() => {
    if (!supabase) return;
    const authClient = supabase;

    let active = true;
    const callbackParams = new URLSearchParams(
      `${window.location.search}&${window.location.hash.replace(/^#/, "")}`,
    );
    const confirmationPending =
      callbackParams.has("confirmed") || callbackParams.get("type") === "signup";
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
          setNotice(
            "Your email is confirmed, but we couldn't end the confirmation session. Please sign out and try again.",
          );
        }
      }
    }

    if (callbackParams.has("error")) {
      setNoticeType("info");
      setNotice(
        callbackParams.get("error_code") === "otp_expired"
          ? "This confirmation link has expired. Create a new account or ask for a fresh confirmation email."
          : "We couldn't verify that email link. Please request a fresh confirmation email.",
      );
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const { data } = authClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" && confirmationPending) void finishConfirmation();
    });

    void authClient.auth.getSession().then(({ data: sessionData, error }) => {
      if (error) {
        console.error("Unable to restore Supabase session:", error);
        if (active) {
          setNoticeType("error");
          setNotice("We couldn't verify your sign-in link. Please try signing in again.");
        }
        return;
      }
      if (active && sessionData.session) {
        if (confirmationPending) {
          void finishConfirmation();
        } else {
          void navigate({ to: "/" });
        }
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!supabase) {
      setNoticeType("error");
      setNotice(
        "Authentication is not configured. Add the Supabase URL and publishable key to your environment.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
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
          options: {
            emailRedirectTo: `${window.location.origin}/login?confirmed=1`,
          },
        });
        if (error) throw error;

        if (data.session) {
          const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
          if (signOutError) throw signOutError;
          setNoticeType("info");
          setNotice(
            "Account created, but email confirmation is disabled. Enable Confirm email in your Supabase Auth settings before testing sign-in.",
          );
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
      setNotice(
        error instanceof Error
          ? error.message
          : isLogin
            ? "Unable to sign in. Please try again."
            : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-story" aria-label="About Pragati">
        <Link to="/" className="login-brand" aria-label="Pragati home">
          <span className="login-brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            pragati<span className="login-brand-period">.</span>
          </span>
        </Link>

        <div className="login-story-content">
          <span className="login-eyebrow">
            <span /> STUDENT SUCCESS, TOGETHER
          </span>
          <h1>Every student has a next step.</h1>
          <p>
            Bring insight, care, and timely support together in one place. Pick up where your
            student success team left off.
          </p>
          <div className="login-quote">
            <div className="login-quote-mark" aria-hidden="true">
              “
            </div>
            <p>Small, timely support can make a meaningful difference in a student’s journey.</p>
            <span>THE PRAGATI APPROACH</span>
          </div>
        </div>

        <div className="login-story-footer">
          <ShieldCheck aria-hidden="true" />
          <span>Thoughtful support. Clearer journeys.</span>
        </div>
      </section>

      <section className="login-form-side" aria-labelledby="login-title">
        <div className="login-form-wrap">
          <div className="login-mobile-brand" aria-hidden="true">
            <span className="login-brand-mark">
              <i />
              <i />
              <i />
            </span>
            <span>
              pragati<span className="login-brand-period">.</span>
            </span>
          </div>

          <div className="login-heading">
            <span className="login-welcome">{isLogin ? "WELCOME BACK" : "GET STARTED"}</span>
            <h2 id="login-title">
              {isLogin ? "Sign in to your workspace" : "Create your Pragati account"}
            </h2>
            <p>
              {isLogin
                ? "Enter your details to continue to Pragati."
                : "Create an account with your email. We’ll send you a confirmation link."}
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Work email</label>
            <div className="login-input-wrap">
              <Mail aria-hidden="true" />
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@institution.edu"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-password-label">
              <label htmlFor="login-password">Password</label>
              {isLogin && (
                <button
                  className="login-text-button"
                  type="button"
                  onClick={() => {
                    setNoticeType("info");
                    setNotice("To reset your password, contact your administrator.");
                  }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="login-input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                minLength={isLogin ? undefined : 8}
                required
              />
              <button
                className="login-password-toggle"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
              {!isSubmitting && <ArrowRight aria-hidden="true" />}
            </button>
            <p className={`login-notice ${noticeType}`} role="status" aria-live="polite">
              {notice}
            </p>
          </form>

          <p className="login-help">
            {isLogin ? "New to Pragati? " : "Already have an account? "}
            <button
              className="login-text-button"
              type="button"
              onClick={() => {
                setIsLogin((login) => !login);
                setNotice("");
              }}
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
          <Link to="/" className="login-back-link">
            Back to dashboard
          </Link>
        </div>
        <footer className="login-footer">
          © 2026 Pragati <span>·</span> Every student. A step forward.
        </footer>
      </section>
    </main>
  );
}
