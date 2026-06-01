import { Badge, type BadgeTone } from "@/components/ui/Badge";
import type { CitizenCase, CaseStatus } from "@/lib/types";

const STATUS_LABEL: Record<Exclude<CaseStatus, "awaiting-payment">, { tone: BadgeTone; label: string }> = {
  resolved: { tone: "success", label: "Riješeno" },
  "in-progress": { tone: "warning", label: "U obradi" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface CaseListItemProps {
  item: CitizenCase;
}

export function CaseListItem({ item }: CaseListItemProps) {
  return (
    <li
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-md)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 600, color: "var(--color-text)" }}>
          {item.title}
        </h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "var(--color-text-muted)" }}>
          REF: {item.ref} • {formatDate(item.date)}
        </p>
      </div>

      {item.status === "awaiting-payment" ? (
        <button
          type="button"
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
          Plati {item.amountDue} €
        </button>
      ) : (
        <Badge tone={STATUS_LABEL[item.status].tone} label={STATUS_LABEL[item.status].label} />
      )}
    </li>
  );
}
