"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      role="alert"
      style={{
        padding: "var(--space-lg)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-md)",
      }}
    >
      <p style={{ margin: 0, color: "var(--color-error)", fontSize: "16px" }}>
        Došlo je do greške: {error.message}
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          background: "var(--color-primary-strong)",
          color: "var(--color-on-primary)",
          border: "none",
          borderRadius: "var(--radius-md)",
          padding: "10px 24px",
          fontSize: "16px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Pokušaj ponovo
      </button>
    </div>
  )
}
