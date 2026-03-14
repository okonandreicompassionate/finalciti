"use client";

import Link from "next/link";

export default function NoAccountAccessPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.glowOne}></div>
          <div style={styles.glowTwo}></div>

          <div style={styles.content}>
            <div style={styles.iconWrap}>
              <div style={styles.icon}>🚫</div>
            </div>

            <p style={styles.badge}>Restricted Access</p>

            <h1 style={styles.title}>You are not allowed to create an account</h1>

            <p style={styles.subtitle}>
              Account creation is currently restricted for this platform. If you
              believe this is a mistake, please contact support or speak with an
              administrator.
            </p>

            <div style={styles.infoBox}>
              <p style={styles.infoTitle}>Why am I seeing this?</p>
              <p style={styles.infoText}>
                New registrations may be disabled due to admin-only onboarding,
                invitation-based access, maintenance, or compliance checks.
              </p>
            </div>

            <div style={styles.actions}>
              <Link href="/login" style={styles.primaryButton}>
                Back to Login
              </Link>

              <a href="mailto:support@hubio.com" style={styles.secondaryButton}>
                Contact Support
              </a>
            </div>

            <p style={styles.footerText}>
              Already have access? Use your existing credentials to sign in.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    margin: 0,
    padding: "24px",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #f5f7fa 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  container: {
    width: "100%",
    maxWidth: "760px",
  } as React.CSSProperties,

  card: {
    position: "relative" as const,
    overflow: "hidden",
    borderRadius: "28px",
    background: "#ffffff",
    border: "1px solid rgba(0, 102, 204, 0.12)",
    boxShadow: "0 20px 60px rgba(0, 85, 170, 0.10)",
  } as React.CSSProperties,

  glowOne: {
    position: "absolute" as const,
    top: "-40px",
    right: "-40px",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "rgba(0, 102, 204, 0.10)",
    filter: "blur(40px)",
  } as React.CSSProperties,

  glowTwo: {
    position: "absolute" as const,
    bottom: "-60px",
    left: "-60px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(0, 128, 255, 0.10)",
    filter: "blur(50px)",
  } as React.CSSProperties,

  content: {
    position: "relative" as const,
    zIndex: 2,
    padding: "56px 40px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  iconWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  } as React.CSSProperties,

  icon: {
    width: "88px",
    height: "88px",
    borderRadius: "24px",
    background: "linear-gradient(135deg, #0066cc 0%, #004999 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    color: "#fff",
    boxShadow: "0 12px 30px rgba(0, 102, 204, 0.25)",
  } as React.CSSProperties,

  badge: {
    display: "inline-block",
    margin: "0 0 14px 0",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#e8f1ff",
    color: "#0066cc",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  } as React.CSSProperties,

  title: {
    margin: "0 0 14px 0",
    fontSize: "38px",
    lineHeight: 1.15,
    fontWeight: 800,
    color: "#111827",
  } as React.CSSProperties,

  subtitle: {
    margin: "0 auto 28px auto",
    maxWidth: "560px",
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#667085",
  } as React.CSSProperties,

  infoBox: {
    maxWidth: "560px",
    margin: "0 auto 30px auto",
    padding: "18px 20px",
    borderRadius: "18px",
    background: "#f8fbff",
    border: "1px solid #dbeafe",
    textAlign: "left" as const,
  } as React.CSSProperties,

  infoTitle: {
    margin: "0 0 6px 0",
    fontSize: "14px",
    fontWeight: 700,
    color: "#0f172a",
  } as React.CSSProperties,

  infoText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#64748b",
  } as React.CSSProperties,

  actions: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
    marginBottom: "18px",
  } as React.CSSProperties,

  primaryButton: {
    textDecoration: "none",
    background: "linear-gradient(135deg, #0066cc 0%, #004999 100%)",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 700,
    boxShadow: "0 10px 22px rgba(0, 102, 204, 0.22)",
  } as React.CSSProperties,

  secondaryButton: {
    textDecoration: "none",
    background: "#ffffff",
    color: "#0066cc",
    padding: "14px 22px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 700,
    border: "1px solid #cfe2ff",
  } as React.CSSProperties,

  footerText: {
    margin: 0,
    fontSize: "13px",
    color: "#98a2b3",
  } as React.CSSProperties,
};