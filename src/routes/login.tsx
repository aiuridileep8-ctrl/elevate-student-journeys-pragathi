import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Stride" },
      { name: "description", content: "Sign in to your Stride student success workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
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
    let recoveryPending = callbackParams.get("type") === "recovery" || callbackParams.has("reset");
    const confirmationHandled = { current: false };

    if (recoveryPending) {
      setIsPasswordRecovery(true);
      setIsLogin(true);
      setNoticeType("info");
      setNotice("Choose a new password for your account.");
    }

    if (confirmationPending) {
      setNoticeType("success");
      setNotice("Your email is confirmed. Opening your Stride dashboard...");
    }

    function finishConfirmation() {
      if (!confirmationPending || confirmationHandled.current) return;
      confirmationHandled.current = true;
      void navigate({ to: "/" });
    }

    if (callbackParams.has("error")) {
      const recoveryLinkError =
        callbackParams.get("error_code") === "otp_expired" ||
        callbackParams.get("error_code") === "access_denied";
      setNoticeType(recoveryLinkError ? "error" : "info");
      setNotice(
        recoveryLinkError
          ? "This password reset link is invalid or expired. Request a new reset email and open the newest link."
          : "We couldn't verify that email link. Please request a fresh confirmation email.",
      );
      setIsPasswordRecovery(false);
      setIsForgotPassword(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const { data } = authClient.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        recoveryPending = true;
        setIsPasswordRecovery(true);
        setIsForgotPassword(false);
        setIsLogin(true);
        setNoticeType("info");
        setNotice("Choose a new password for your account.");
      } else if (event === "SIGNED_IN" && confirmationPending) {
        void finishConfirmation();
      } else if (event === "SIGNED_IN" && !recoveryPending) {
        void navigate({ to: "/" });
      }
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
          finishConfirmation();
        } else if (recoveryPending) {
          setIsPasswordRecovery(true);
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
    const confirmPassword = String(formData.get("confirm-password") ?? "");

    if (!supabase) {
      setNoticeType("error");
      setNotice(
        "Authentication is not configured. Add the Supabase URL and publishable key to your environment.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (isPasswordRecovery) {
        if (password !== confirmPassword) {
          setNoticeType("error");
          setNotice("The passwords do not match.");
          return;
        }
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
        if (signOutError) {
          console.error(
            "Password changed, but signing out the recovery session failed:",
            signOutError,
          );
        }
        form.reset();
        setIsPasswordRecovery(false);
        setIsForgotPassword(false);
        setIsLogin(true);
        setNoticeType("success");
        setNotice("Password updated. Sign in with your new password.");
      } else if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login?reset=1`,
        });
        if (error) throw error;
        setNoticeType("success");
        setNotice("If an account exists for that email, a password reset link has been sent.");
      } else if (isLogin) {
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
          : isPasswordRecovery
            ? "Unable to update your password. Please request a new reset link."
            : isForgotPassword
              ? "Unable to send a password reset email. Please try again."
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
      <section className="login-story" aria-label="About Stride">
        <Link to="/" className="login-brand" aria-label="Stride home">
          <span className="login-brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            stride<span className="login-brand-period">.</span>
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
              stride<span className="login-brand-period">.</span>
            </span>
          </div>

          <div className="login-heading">
            <span className="login-welcome">
              {isPasswordRecovery
                ? "PASSWORD RESET"
                : isForgotPassword
                  ? "ACCOUNT RECOVERY"
                  : isLogin
                    ? "WELCOME BACK"
                    : "GET STARTED"}
            </span>
            <h2 id="login-title">
              {isPasswordRecovery
                ? "Choose a new password"
                : isForgotPassword
                  ? "Reset your password"
                  : isLogin
                    ? "Sign in to your workspace"
                    : "Create your Stride account"}
            </h2>
            <p>
              {isPasswordRecovery
                ? "Enter and confirm your new password below."
                : isForgotPassword
                  ? "Enter your account email and we’ll send a password reset link."
                  : isLogin
                    ? "Enter your details to continue to Stride."
                    : "Create an account with your email. We’ll send you a confirmation link."}
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isPasswordRecovery && (
              <>
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
              </>
            )}

            {!isForgotPassword && (
              <>
                <div className="login-password-label">
                  <label htmlFor="login-password">
                    {isPasswordRecovery ? "New password" : "Password"}
                  </label>
                  {isLogin && !isPasswordRecovery && (
                    <button
                      className="login-text-button"
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setNotice("");
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
                    placeholder={
                      isPasswordRecovery ? "Enter a new password" : "Enter your password"
                    }
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    minLength={isLogin && !isPasswordRecovery ? undefined : 8}
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
                {isPasswordRecovery && (
                  <>
                    <label htmlFor="confirm-password">Confirm new password</label>
                    <div className="login-input-wrap">
                      <LockKeyhole aria-hidden="true" />
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter your new password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Please wait..."
                : isPasswordRecovery
                  ? "Update password"
                  : isForgotPassword
                    ? "Send reset link"
                    : isLogin
                      ? "Sign in"
                      : "Create account"}
              {!isSubmitting && <ArrowRight aria-hidden="true" />}
            </button>
            <p className={`login-notice ${noticeType}`} role="status" aria-live="polite">
              {notice}
            </p>
          </form>

          {isPasswordRecovery || isForgotPassword ? (
            <p className="login-help">
              <button
                className="login-text-button"
                type="button"
                onClick={() => {
                  setIsPasswordRecovery(false);
                  setIsForgotPassword(false);
                  setNotice("");
                  setIsLogin(true);
                }}
              >
                Back to sign in
              </button>
            </p>
          ) : (
            <p className="login-help">
              {isLogin ? "New to Stride? " : "Already have an account? "}
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
          )}
          <p className="login-help">
            Evaluation access is open to confirmed accounts. Production access will be limited to
            approved staff.
          </p>
          <Link to="/" className="login-back-link">
            Back to dashboard
          </Link>
        </div>
        <footer className="login-footer">
          © 2026 Stride <span>·</span> Every student. A step forward.
        </footer>
      </section>
    </main>
  );
}
