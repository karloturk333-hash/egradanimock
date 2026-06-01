import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Message } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("hr-HR", {
  day: "numeric",
  month: "short",
});

function formatShortDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

interface MessageListItemProps {
  message: Message;
  /** Označena poruka u desktop split prikazu. */
  isActive?: boolean;
  onClick: () => void;
}

export function MessageListItem({ message, isActive = false, onClick }: MessageListItemProps) {
  const { senderName, subject, preview, sentAt, isRead } = message;

  function handleKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <li
      role="button"
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${senderName}: ${subject}${isRead ? "" : ", nepročitano"}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="eg-row-hover eg-focusable"
      style={{
        position: "relative",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: isActive ? "var(--color-surface-2)" : "var(--color-surface)",
        border: `1px solid ${isActive ? "var(--color-primary)" : "var(--color-border)"}`,
        borderLeft: `4px solid ${isRead ? "transparent" : "var(--color-primary)"}`,
        borderRadius: "var(--radius-card)",
        padding: "var(--space-md)",
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: isRead ? 500 : 600,
              color: "var(--color-text-muted)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {senderName}
          </span>
          <span style={{ fontSize: "13px", color: "var(--color-text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
            {formatShortDate(sentAt)}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0 2px 0" }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: isRead ? 500 : 700,
              color: "var(--color-text)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
            }}
          >
            {subject}
          </h3>
          {!isRead && <Badge tone="info" label="Novo" />}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {preview}
        </p>
      </div>

      <span style={{ color: "var(--color-outline)", display: "inline-flex", flexShrink: 0 }} aria-hidden="true">
        <ChevronRight size={20} strokeWidth={2} />
      </span>
    </li>
  );
}
