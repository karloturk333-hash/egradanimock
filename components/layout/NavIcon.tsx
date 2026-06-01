import { Icon, type IconName } from "@/components/ui/Icon";
import type { LucideIcon } from "lucide-react";

interface NavIconProps {
  icon: IconName | LucideIcon;
  size: number;
  active: boolean;
  /** Broj nepročitanih — prikazuje kružić s brojem ako je > 0. */
  unreadCount?: number;
}

/** Navigacijska ikona s opcionalnim badge kružićem (nepročitano). */
export function NavIcon({ icon, size, active, unreadCount }: NavIconProps) {
  const strokeWidth = active ? 2.4 : 2;

  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      {typeof icon === "string" ? (
        <Icon name={icon} size={size} strokeWidth={strokeWidth} />
      ) : (
        (() => {
          const LucideComp = icon;
          return <LucideComp size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
        })()
      )}

      {unreadCount !== undefined && unreadCount > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-6px",
            right: "-10px",
            minWidth: "18px",
            height: "18px",
            padding: "0 4px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-error)",
            color: "var(--color-text-inverse)",
            borderRadius: "var(--radius-pill)",
            border: "1.5px solid var(--color-surface)",
            fontSize: "11px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {unreadCount}
        </span>
      )}
    </span>
  );
}
