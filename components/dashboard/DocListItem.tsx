import { Icon } from "@/components/ui/Icon";
import type { CitizenDocument } from "@/lib/types";

interface DocListItemProps {
  doc: CitizenDocument;
  /** Zadnji redak nema donji obrub. */
  isLast?: boolean;
}

export function DocListItem({ doc, isLast = false }: DocListItemProps) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "var(--space-md)",
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <span style={{ color: "var(--color-outline)", display: "inline-flex", flexShrink: 0 }}>
          <Icon name="file-text" size={22} />
        </span>
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--color-text)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {doc.name}
          </h3>
          <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "var(--color-text-muted)" }}>
            {doc.fileType} • {doc.fileSize}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Preuzmi: ${doc.name}`}
        className="eg-icon-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          color: "var(--color-primary)",
          background: "transparent",
          border: "none",
          borderRadius: "var(--radius-pill)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Icon name="download" size={20} />
      </button>
    </li>
  );
}
