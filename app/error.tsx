"use client";

import { useEffect } from "react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Error stanje dashboarda — inline blok s retry-em (usklađeno s /poruke/error.tsx). */
export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-md)",
        background: "var(--color-error-bg)",
        border: "1px solid var(--color-error)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-md)",
        maxWidth: "420px",
      }}
    >
      <p style={{ margin: 0, fontSize: "16px", color: "var(--color-error)" }}>
        Podatke trenutačno nije moguće dohvatiti.
      </p>
      <button
        type="button"
        onClick={reset}
        className="eg-btn-primary"
        style={{
          background: "var(--color-primary-strong)",
          color: "var(--color-on-primary)",
          border: "none",
          borderRadius: "var(--radius-md)",
          padding: "8px 24px",
          fontSize: "16px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Pokušaj ponovo
      </button>
    </div>
  );
}
