import { Icon } from "@/components/ui/Icon";

const USER = { name: "Marko Horvat", initials: "MH" };

interface TopAppBarProps {
  greeting: string;
  /** Broj novih obavijesti — točkica + dinamičan aria-label. */
  notificationCount?: number;
}

/** Hrvatska sklonidba: 1 nova, 2–4 nove, ostalo novih (uz iznimke 11–14). */
function obavijestiLabel(count: number): string {
  if (count <= 0) return "Obavijesti";
  const d = count % 10;
  const dd = count % 100;
  let noun = "novih";
  if (d === 1 && dd !== 11) noun = "nova";
  else if (d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14)) noun = "nove";
  return `Obavijesti (${count} ${noun})`;
}

export function TopAppBar({ greeting, notificationCount = 0 }: TopAppBarProps) {
  const hasNotifications = notificationCount > 0;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "12px var(--margin-mobile)",
        minHeight: "var(--header-height)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <div
          aria-hidden="true"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-primary-strong)",
            color: "var(--color-on-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.03em",
            flexShrink: 0,
          }}
        >
          {USER.initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 600,
              color: "var(--color-primary)",
              lineHeight: 1.2,
            }}
          >
            eGrađani
          </h1>
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
            {greeting}, {USER.name.split(" ")[0]} • Svi vaši servisi
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={obavijestiLabel(notificationCount)}
        className="eg-icon-btn"
        style={{
          position: "relative",
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
        <Icon name="bell" size={22} />
        {hasNotifications && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "8px",
              height: "8px",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-error)",
              border: "1.5px solid var(--color-surface)",
            }}
          />
        )}
      </button>
    </header>
  );
}
