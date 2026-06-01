import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { AsyncState } from "@/lib/types";

interface StatCardProps {
  label: string;
  sublabel: string;
  icon: IconName;
  /** Boja ikone prema funkcionalnom statusu. */
  iconColor: string;
  state: AsyncState<number>;
}

export function StatCard({ label, sublabel, icon, iconColor, state }: StatCardProps) {
  return (
    <Card
      style={{ minWidth: "150px", flexShrink: 0 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: iconColor, display: "inline-flex" }}>
            <Icon name={icon} size={20} />
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.03em",
              color: "var(--color-text-muted)",
            }}
          >
            {label}
          </span>
        </div>

        {state.status === "loading" && (
          <div aria-busy="true" aria-label={`Učitavanje: ${label}`} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Skeleton height="32px" width="48px" />
            <Skeleton height="14px" width="90px" />
          </div>
        )}

        {state.status === "error" && (
          <p role="alert" style={{ margin: 0, color: "var(--color-error)", fontSize: "14px" }}>
            Greška pri učitavanju
          </p>
        )}

        {state.status === "success" && (
          <>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: 1.3,
                color: "var(--color-text)",
              }}
            >
              {state.data}
            </span>
            <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>{sublabel}</span>
          </>
        )}
      </div>
    </Card>
  );
}
