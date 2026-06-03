import { ArrowLeft, Reply, Archive, Trash2 } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import type { Message } from "@/lib/types";

function initials(name: string): string {
  const letters = name.replace(/[^\p{L}\s].*$/u, "").trim();
  const parts = letters.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

interface DetailActionProps {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}

function DetailAction({ icon, label, primary = false }: DetailActionProps) {
  return (
    <button
      type="button"
      className={primary ? "eg-btn-primary" : "eg-icon-btn"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "8px 16px",
        minHeight: "44px",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        borderRadius: "var(--radius-md)",
        border: primary ? "none" : "1px solid var(--color-border)",
        background: primary ? "var(--color-primary-strong)" : "transparent",
        color: primary ? "var(--color-on-primary)" : "var(--color-text-muted)",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

interface MessageDetailProps {
  message: Message;
  /** Kad je zadan, prikazuje gumb za povratak (mobilni / split). */
  onClose?: () => void;
}

export function MessageDetail({ message, onClose }: MessageDetailProps) {
  const { senderName, subject, body, sentAt } = message;

  return (
    <article
      aria-label={`Poruka: ${subject}`}
      style={{
        display: "flex",
        flexDirection: "column",
        // maxHeight (ne fiksni height) → kratka poruka steže karticu i footer huga sadržaj;
        // duga poruka puni visinu stupca i tijelo se skrola.
        maxHeight: "100%",
        minHeight: 0,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "var(--space-md)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Natrag na pretinac"
            className="eg-icon-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "44px",
              minHeight: "44px",
              color: "var(--color-text-muted)",
              background: "transparent",
              border: "none",
              borderRadius: "var(--radius-pill)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
        )}

        <div
          aria-hidden="true"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-primary-subtle)",
            color: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            flexShrink: 0,
          }}
        >
          {initials(senderName).toUpperCase()}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 600,
              lineHeight: 1.3,
              color: "var(--color-text)",
            }}
          >
            {subject}
          </h2>
          <p style={{ margin: "6px 0 0 0", fontSize: "14px", fontWeight: 600, color: "var(--color-text)" }}>
            {senderName}
          </p>
          <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "var(--color-text-muted)" }}>
            {formatDateTime(sentAt)}
          </p>
        </div>
      </header>

      {/* Tijelo poruke — scrollabilno */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "var(--space-lg) var(--space-md)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            lineHeight: 1.6,
            color: "var(--color-text)",
            whiteSpace: "pre-line",
          }}
        >
          {body}
        </p>
      </div>

      {/* Akcije */}
      <footer
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "var(--space-md)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <DetailAction primary icon={<Reply size={16} strokeWidth={2} />} label="Odgovori" />
        <DetailAction icon={<Archive size={16} strokeWidth={2} />} label="Arhiviraj" />
        <DetailAction icon={<Trash2 size={16} strokeWidth={2} />} label="Izbriši" />
      </footer>
    </article>
  );
}
