"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
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
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "6px 16px",
              borderRadius: "var(--radius-pill)",
              textDecoration: "none",
              color: active ? "var(--color-primary)" : "var(--color-text-muted)",
              background: active ? "var(--color-primary-subtle)" : "transparent",
            }}
          >
            <Icon name={icon} size={22} strokeWidth={active ? 2.4 : 2} />
            <span style={{ fontSize: "12px", fontWeight: active ? 600 : 500, letterSpacing: "0.02em" }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
