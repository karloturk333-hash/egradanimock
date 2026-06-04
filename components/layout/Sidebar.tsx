"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/layout/NavIcon";
import { NAV_ITEMS } from "@/components/layout/nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Glavna navigacija"
      className="eg-desktop-only"
      style={{
        flexDirection: "column",
        width: "var(--sidebar-width)",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
        padding: "0 0 24px 0",
      }}
    >
      <div
        style={{
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-xl)",
            color: "var(--color-primary)",
          }}
        >
          eGrađani
        </span>
      </div>

      <ul
        role="list"
        style={{ listStyle: "none", margin: "16px 0 0 0", padding: "0 12px", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}
      >
        {NAV_ITEMS.map(({ href, label, icon, unreadCount }) => {
          const active = pathname === href;
          const hasUnread = unreadCount !== undefined && unreadCount > 0;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                aria-label={hasUnread ? `${label}, ${unreadCount} nepročitane` : undefined}
                className="eg-nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-base)",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-primary)" : "var(--color-text-muted)",
                  background: active ? "var(--color-primary-subtle)" : "transparent",
                  textDecoration: "none",
                }}
              >
                <NavIcon icon={icon} size={20} active={active} unreadCount={unreadCount} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
