"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/layout/NavIcon";
import { NAV_ITEMS } from "@/components/layout/nav-items";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Glavna navigacija"
      className="eg-mobile-only"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        background: "var(--color-surface-3)",
        borderTop: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md) var(--radius-md) 0 0",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 8px calc(8px + env(safe-area-inset-bottom)) 8px",
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon, unreadCount }) => {
        const active = pathname === href;
        const hasUnread = unreadCount !== undefined && unreadCount > 0;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            aria-label={hasUnread ? `${label}, ${unreadCount} nepročitane` : undefined}
            style={{
              flex: "1 1 0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "6px 4px",
              borderRadius: "var(--radius-pill)",
              textDecoration: "none",
              color: active ? "var(--color-primary)" : "var(--color-text-muted)",
              background: active ? "var(--color-primary-subtle)" : "transparent",
            }}
          >
            <NavIcon icon={icon} size={22} active={active} unreadCount={unreadCount} />
            <span
              style={{
                maxWidth: "100%",
                fontSize: "11px",
                fontWeight: active ? 600 : 500,
                letterSpacing: "0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
