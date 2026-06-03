"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import type { CitizenDocument } from "@/lib/types";

interface DocumentRowProps {
  doc: CitizenDocument;
  /** Poziva se kad korisnik zatraži ispis ovog dokumenta. */
  onPrint: (doc: CitizenDocument) => void;
}

const iconBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "44px",
  minHeight: "44px",
  color: "var(--color-primary)",
  background: "transparent",
  border: "none",
  borderRadius: "var(--radius-pill)",
  cursor: "pointer",
  flexShrink: 0,
  textDecoration: "none",
};

const openArea: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
  flex: 1,
  padding: "var(--space-md)",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  borderRadius: "var(--radius-md)",
};

/**
 * Jedan dokument u listi: lijevi blok (ikona + naziv + meta) je poveznica na
 * pregled (`/dokumenti/[slug]`), dok su desno zasebne akcije — Preuzmi
 * (native <a download> na pravi PDF) i Ispiši (window.print). Akcijski gumbi
 * su ≥44px i fokusirajući tipkovnicom; lijevi blok ima hover/fokus naznaku.
 */
export function DocumentRow({ doc, onPrint }: DocumentRowProps) {
  const meta = [
    doc.fileType,
    doc.fileSize,
    doc.issuedAt ? formatDate(doc.issuedAt) : undefined,
    doc.category,
  ]
    .filter(Boolean)
    .join(" · ");

  const inner = (
    <>
      <span style={{ color: "var(--color-outline)", display: "inline-flex", flexShrink: 0 }}>
        <Icon name="file-text" size={22} />
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--color-text)",
            }}
          >
            {doc.name}
          </h3>
          {doc.isArchived && <Badge tone="neutral" label="Arhivirano" />}
        </div>
        <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "var(--color-text-muted)" }}>
          {meta}
        </p>
      </div>
    </>
  );

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      {doc.slug ? (
        <Link
          href={`/dokumenti/${doc.slug}`}
          aria-label={`Otvori: ${doc.name}`}
          className="eg-row-hover eg-focusable"
          style={openArea}
        >
          {inner}
        </Link>
      ) : (
        <div style={openArea}>{inner}</div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0, paddingRight: "var(--space-md)" }}>
        <a
          href={doc.downloadUrl}
          download={`${doc.name}.pdf`}
          aria-label={`Preuzmi: ${doc.name}`}
          className="eg-icon-btn eg-focusable"
          style={iconBtn}
        >
          <Icon name="download" size={20} />
        </a>
        <button
          type="button"
          aria-label={`Ispiši: ${doc.name}`}
          onClick={() => onPrint(doc)}
          className="eg-icon-btn eg-focusable"
          style={iconBtn}
        >
          <Icon name="printer" size={20} />
        </button>
      </div>
    </li>
  );
}
