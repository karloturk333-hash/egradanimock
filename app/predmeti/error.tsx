"use client";

import { useEffect } from "react";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

interface PredmetiErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Error stanje predmeta — inline poruka s ponovnim pokušajem. */
export default function PredmetiError({ error, reset }: PredmetiErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section aria-label="Moji predmeti">
      <h2 style={sectionHeading}>Moji predmeti</h2>

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
          maxWidth: "520px",
        }}
      >
        <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--color-error)" }}>
          Predmeti trenutačno nije moguće dohvatiti.
        </p>
        <button
          type="button"
          onClick={reset}
          className="eg-btn-primary eg-focusable"
          style={{
            background: "var(--color-primary-strong)",
            color: "var(--color-on-primary)",
            border: "none",
            borderRadius: "var(--radius-md)",
            padding: "8px 24px",
            fontSize: "var(--text-base)",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Pokušaj ponovo
        </button>
      </div>
    </section>
  );
}
