import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface KatalogCardProps {
  icon: LucideIcon;
  title: string;
  examples: string;
  href: string;
}

/**
 * Kartica životnog područja. Cijela kartica je jedan link (<a>) radi velike
 * dodirne mete (≥44px). Naslov je h3 s eksplicitnim sans fontom (globalni
 * h1,h2,h3 inače nameću display serif) i bojom primarnog linka.
 */
export function KatalogCard({ icon: Icon, title, examples, href }: KatalogCardProps) {
  return (
    <Card className="eg-katalog-card" padding={0} style={{ height: "100%" }}>
      <Link
        href={href}
        className="eg-focusable"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          height: "100%",
          minHeight: "44px",
          padding: "var(--space-md)",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "var(--radius-md)",
            background: "var(--color-surface-3)",
            color: "var(--color-primary)",
          }}
        >
          <Icon size={24} strokeWidth={2} />
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
          >
            {title}
          </h3>
          <ChevronRight
            size={20}
            strokeWidth={2}
            aria-hidden="true"
            style={{ flexShrink: 0, color: "var(--color-primary)" }}
          />
        </div>

        <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5, color: "var(--color-text-muted)" }}>
          {examples}
        </p>
      </Link>
    </Card>
  );
}
