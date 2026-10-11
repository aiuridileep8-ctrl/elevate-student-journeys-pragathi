import { useEffect, useState, type FormEvent } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"error" | "success" | "info">("info");

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    const callbackParams = new URLSearchParams(
      `${window.location.search}&${window.location.hash.replace(/^#/, "")}`,
    );
    if (callbackParams.has("error")) {
      setNoticeType("info");
      setNotice(
        callbackParams.get("error_code") === "otp_expired"
          ? "This invitation or confirmation link has expired. Ask your administrator to send a new invite."
          : "We couldn't verify that email link. Ask your administrator to send a new invite.",
      );
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        void navigate({ to: "/" });
      }
    });

    void supabase.auth.getSession().then(({ data: sessionData, error }) => {
      if (error) {
        console.error("Unable to restore Supabase session:", error);
        if (active) {
          setNoticeType("error");
          setNotice("We couldn't verify your sign-in link. Please try signing in again.");
        }
        return;
      }
      if (active && sessionData.session) {
        void navigate({ to: "/" });
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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setNoticeType("info");
          setNotice("Confirm your email using the invitation link before signing in.");
          return;
        }
        throw error;
      }
      await navigate({ to: "/" });
    } catch (error) {
      setNoticeType("error");
      setNotice(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
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
            <span className="login-welcome">WELCOME BACK</span>
            <h2 id="login-title">Sign in to your workspace</h2>
            <p>Enter your details to continue to Pragati.</p>
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
            </div>
            <div className="login-input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
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
              {isSubmitting ? "Please wait..." : "Sign in"}
              {!isSubmitting && <ArrowRight aria-hidden="true" />}
            </button>
            <p className={`login-notice ${noticeType}`} role="status" aria-live="polite">
              {notice}
            </p>
          </form>

          <p className="login-help">Access is by invitation. Contact your Pragati administrator.</p>
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
