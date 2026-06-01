import { MailOpen } from "lucide-react";

/** Prazno stanje pretinca (inbox zero). Statična komponenta bez propsa. */
export function InboxEmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "var(--space-md)",
        padding: "var(--space-lg) var(--space-md)",
        minHeight: "50vh",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "72px",
          height: "72px",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-surface-3)",
          color: "var(--color-primary)",
        }}
      >
        <MailOpen size={34} strokeWidth={1.75} />
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          Pretinac je prazan
        </h2>
        <p style={{ margin: 0, fontSize: "16px", color: "var(--color-text-muted)", maxWidth: "320px" }}>
          Sve poruke su pročitane ili još nema poruka.
        </p>
      </div>
    </div>
  );
}
