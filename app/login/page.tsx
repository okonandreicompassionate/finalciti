"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type CSSProperties, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("demo@hubio.com");
  const [password, setPassword] = useState("demo123");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
     const res = await fetch("https://end-g8il.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Backend did not return JSON");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      localStorage.setItem("hubio_user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", sans-serif;
          background: #f6f8fb;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column;
          }

          .login-visual,
          .login-form {
            width: 100% !important;
          }

          .login-visual {
            min-height: 380px;
            padding: 40px 24px !important;
          }

          .login-form {
            padding: 40px 24px !important;
          }
        }

        @media (max-width: 640px) {
          .login-main {
            background: #f6f8fb;
          }

          .login-visual {
            min-height: auto;
            padding: 32px 20px !important;
          }

          .login-form {
            padding: 28px 18px 32px !important;
          }

          .login-form-card {
            max-width: 100% !important;
          }

          .login-title {
            font-size: 28px !important;
          }

          .login-hero-title {
            font-size: 28px !important;
          }

          .login-hero-text {
            font-size: 14px !important;
          }

          .login-actions-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>

      <main style={styles.main} className="login-main">
        <div style={styles.container} className="login-container">
          <div style={styles.visualSection} className="login-visual">
            <div style={styles.decorative1} />
            <div style={styles.decorative2} />

            <div style={styles.visualContent}>
              <div style={styles.heroBadge}>Secure finance workspace</div>

              <div style={styles.illustration}>
                <div style={styles.illustrationCircle}>💳</div>
              </div>

              <h2 style={styles.visualTitle} className="login-hero-title">
                Smarter control over your money
              </h2>

              <p style={styles.visualSubtitle} className="login-hero-text">
                Track balances, review transactions, monitor cards, and manage
                your financial activity from one clean dashboard.
              </p>

              <div style={styles.featuresList}>
                <div style={styles.featureItem}>
                  <div style={styles.featureCheckmark}>✓</div>
                  <span style={styles.featureText}>Live account overview</span>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureCheckmark}>✓</div>
                  <span style={styles.featureText}>
                    Spending and cashflow insights
                  </span>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureCheckmark}>✓</div>
                  <span style={styles.featureText}>
                    Protected access and activity logs
                  </span>
                </div>
              </div>

              <div style={styles.testimonial}>
                <p style={styles.testimonialLabel}>Platform update</p>
                <p style={styles.testimonialText}>
                  Your workspace is configured for secure access. Sign in to
                  continue to your dashboard and review the latest account data.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.formSection} className="login-form">
            <div style={styles.formContainer} className="login-form-card">
              <div style={styles.logoContainer}>
                <h1 style={styles.logo}>
                  <Link href="/" style={styles.logoLink}>
                    <img
                      src="https://i.imgur.com/s0j9cDx.png"
                      alt="Hubio logo"
                      style={styles.logoImage}
                    />
                  </Link>
                </h1>
                <p style={styles.logoSubtext}>Financial operations dashboard</p>
              </div>

              <div style={styles.formHeader}>
                <h2 style={styles.formTitle} className="login-title">
                  Welcome back
                </h2>
                <p style={styles.formSubtitle}>
                  Sign in with your account credentials to continue
                </p>
              </div>

              <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Password</label>
                  <div style={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={styles.passwordInput}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div
                  style={styles.checkboxContainer}
                  className="login-actions-row"
                >
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" style={styles.forgotLink}>
                    Forgot password?
                  </a>
                </div>

                {errorMessage ? (
                  <div style={styles.errorBox}>{errorMessage}</div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.submitButton,
                    opacity: loading ? 0.75 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <div style={styles.loadingContainer}>
                      <svg
                        style={styles.spinner}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          style={styles.spinnerCircle}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          style={styles.spinnerPath}
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>OR</span>
                <div style={styles.dividerLine} />
              </div>

              <div style={styles.socialButtons}>
                <button style={styles.socialButton} type="button">
                  <span style={styles.socialIcon}>G</span>
                  <span>Continue with Google</span>
                </button>
              </div>

              <p style={styles.signupText}>
                Don&apos;t have an account?{" "}
                <Link href="/no-account" style={styles.signupLink}>
                  Request access
                </Link>
              </p>

              <p style={styles.footerText}>
                By signing in, you agree to our{" "}
                <a href="#" style={styles.footerLink}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" style={styles.footerLink}>
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f8fbff 0%, #f4f7fb 45%, #eef3f9 100%)",
    padding: "0",
  },

  container: {
    display: "flex",
    minHeight: "100vh",
  },

  visualSection: {
    width: "52%",
    background: "linear-gradient(135deg, #0066cc 0%, #0052cc 48%, #003f8f 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "56px",
    position: "relative",
    overflow: "hidden",
  },

  decorative1: {
    position: "absolute",
    top: "32px",
    right: "32px",
    width: "260px",
    height: "260px",
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: "50%",
    filter: "blur(70px)",
  },

  decorative2: {
    position: "absolute",
    bottom: "24px",
    left: "24px",
    width: "320px",
    height: "320px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "50%",
    filter: "blur(80px)",
  },

  visualContent: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "460px",
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 600,
    marginBottom: "24px",
    backdropFilter: "blur(10px)",
  },

  illustration: {
    marginBottom: "28px",
  },

  illustrationCircle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "92px",
    height: "92px",
    borderRadius: "28px",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(14px)",
    fontSize: "42px",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },

  visualTitle: {
    fontSize: "42px",
    lineHeight: 1.1,
    fontWeight: 800,
    color: "#fff",
    marginBottom: "14px",
    letterSpacing: "-0.04em",
  },

  visualSubtitle: {
    fontSize: "16px",
    lineHeight: 1.7,
    color: "rgba(255, 255, 255, 0.82)",
    marginBottom: "34px",
    maxWidth: "420px",
  },

  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "8px",
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  featureCheckmark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 700,
    flexShrink: 0,
  },

  featureText: {
    color: "rgba(255, 255, 255, 0.93)",
    fontSize: "14px",
    fontWeight: 500,
  },

  testimonial: {
    marginTop: "34px",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: "18px",
    padding: "22px",
  },

  testimonialLabel: {
    color: "#dbeafe",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: "0 0 10px 0",
  },

  testimonialText: {
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: "14px",
    lineHeight: 1.7,
    margin: 0,
  },

  formSection: {
    width: "48%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "56px 32px",
    backgroundColor: "transparent",
  },

  formContainer: {
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "rgba(255,255,255,0.92)",
    border: "1px solid #e5e7eb",
    borderRadius: "24px",
    padding: "36px 30px",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
    backdropFilter: "blur(10px)",
  },

  logoContainer: {
    marginBottom: "30px",
  },

  logo: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#0066cc",
    margin: 0,
    letterSpacing: "-0.03em",
  },

  logoLink: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  },

  logoImage: {
    display: "block",
    width: "130px",
    height: "auto",
    objectFit: "contain",
  },

  logoSubtext: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: "#6b7280",
  },

  formHeader: {
    marginBottom: "28px",
  },

  formTitle: {
    fontSize: "34px",
    fontWeight: 800,
    color: "#111827",
    margin: "0 0 8px 0",
    letterSpacing: "-0.04em",
  },

  formSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
    lineHeight: 1.6,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#374151",
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.02em",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
    color: "#111827",
  },

  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  passwordInput: {
    width: "100%",
    padding: "14px 52px 14px 16px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
    color: "#111827",
  },

  eyeButton: {
    position: "absolute",
    right: "12px",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    padding: "6px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "13px",
    gap: "12px",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    color: "#4b5563",
  },

  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    accentColor: "#0066cc",
  },

  forgotLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  submitButton: {
    width: "100%",
    background: "linear-gradient(135deg, #0066cc 0%, #004999 100%)",
    color: "#fff",
    fontWeight: "700",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 12px 24px rgba(0, 102, 204, 0.18)",
  },

  loadingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  spinner: {
    width: "16px",
    height: "16px",
    animation: "spin 1s linear infinite",
  },

  spinnerCircle: {
    opacity: 0.25,
  },

  spinnerPath: {
    opacity: 0.75,
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "24px 0 20px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e7eb",
  },

  dividerText: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: 700,
    letterSpacing: "0.08em",
  },

  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  socialButton: {
    width: "100%",
    border: "1px solid #d1d5db",
    padding: "13px 14px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#111827",
    fontWeight: "600",
    fontSize: "14px",
  },

  socialIcon: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    color: "#111827",
    fontSize: "12px",
    fontWeight: 800,
    flexShrink: 0,
  },

  signupText: {
    marginTop: "28px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
  },

  signupLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "700",
  },

  footerText: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "12px",
    color: "#9ca3af",
    lineHeight: 1.7,
  },

  footerLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: 600,
  },

  errorBox: {
    marginTop: "-4px",
    marginBottom: "-4px",
    padding: "12px 14px",
    borderRadius: "12px",
    backgroundColor: "#fff1f2",
    border: "1px solid #fecdd3",
    color: "#be123c",
    fontSize: "13px",
    fontWeight: "600",
  },
};