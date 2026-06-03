"use client";

import { useEffect } from "react";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: 600,
  color: "var(--color-text)",
};

interface KatalogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Error stanje kataloga — inline poruka s mogućnošću ponovnog pokušaja. */
export default function KatalogError({ error, reset }: KatalogErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section aria-label="Katalog usluga">
      <h2 style={sectionHeading}>Katalog usluga</h2>

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
        <p style={{ margin: 0, fontSize: "16px", color: "var(--color-error)" }}>
          Katalog usluga trenutačno nije moguće dohvatiti.
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
    </section>
  );
}
