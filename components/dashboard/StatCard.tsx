import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { AsyncState } from "@/lib/types";

/** Funkcionalni status kartice — interno se mapira na token boje ikone. */
export type StatColor = "success" | "warning" | "error";

const ICON_COLOR: Record<StatColor, string> = {
  success: "var(--color-success-icon)",
  warning: "var(--color-warning-icon)",
  error: "var(--color-error)",
};

interface StatCardProps {
  label: string;
  sublabel: string;
  icon: IconName;
  /** Funkcionalni status (ne sirova boja) — mapira se na token unutar komponente. */
  iconColor: StatColor;
  state: AsyncState<number>;
}

export function StatCard({ label, sublabel, icon, iconColor, state }: StatCardProps) {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <span style={{ color: ICON_COLOR[iconColor], display: "inline-flex" }}>
            <Icon name={icon} size={20} />
          </span>
          <span
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              letterSpacing: "0.03em",
              color: "var(--color-text-muted)",
            }}
          >
            {label}
          </span>
        </div>

        {state.status === "loading" && (
          <div aria-busy="true" aria-label={`Učitavanje: ${label}`} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <Skeleton height="32px" width="48px" />
            <Skeleton height="14px" width="90px" />
          </div>
        )}

        {state.status === "error" && (
          <p role="alert" style={{ margin: 0, color: "var(--color-error)", fontSize: "var(--text-sm)" }}>
            Greška pri učitavanju
          </p>
        )}

        {state.status === "success" && (
          <>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 600,
                lineHeight: 1.3,
                color: "var(--color-text)",
              }}
            >
              {state.data}
            </span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{sublabel}</span>
          </>
        )}
      </div>
    </Card>
  );
}
