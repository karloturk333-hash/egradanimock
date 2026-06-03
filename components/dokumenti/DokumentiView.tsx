"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FileText, FolderOpen, SearchX } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { DocumentRow } from "@/components/dokumenti/DocumentRow";
import { formatDate } from "@/lib/format";
import type { CitizenDocument } from "@/lib/types";

type Tab = "active" | "archive";

/** Hrvatska sklonidba: 1 dokument · 2–4 dokumenta · 0/5+ dokumenata (iznimke 11–14). */
function dokumentWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "dokument";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "dokumenta";
  return "dokumenata";
}

interface DokumentiViewProps {
  documents: CitizenDocument[];
}

/**
 * Orkestrator dokumenata (client). Drži pretragu, aktivnu karticu (Aktivni/Arhiva)
 * i ciljni dokument za ispis. Tablist se uvijek prikazuje (i kad nema dokumenata),
 * pa su sva prazna stanja dostupna preko kartica. Tri prazna stanja:
 *  - prazno-backend / prazni Aktivni: kartica „Aktivni” bez dokumenata
 *  - prazna arhiva: kartica „Arhiva” bez arhiviranih dokumenata
 *  - prazna pretraga: kartica ima dokumenata, ali nijedan ne prolazi pretragu
 *
 * Oba tabpanela se renderiraju (neaktivni je `hidden`) kako bi aria-controls
 * uvijek pokazivao na postojeći element. Ispis: postavljanjem printDoc renderira
 * se skrivena .eg-print-card (koju @media print otkriva), a window.print() se
 * okida nakon iscrtavanja; po završetku (afterprint) printDoc se čisti.
 */
export function DokumentiView({ documents }: DokumentiViewProps) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("active");
  const [printDoc, setPrintDoc] = useState<CitizenDocument | null>(null);

  const baseId = useId();
  const activeTabId = `${baseId}-tab-active`;
  const archiveTabId = `${baseId}-tab-archive`;
  const activePanelId = `${baseId}-panel-active`;
  const archivePanelId = `${baseId}-panel-archive`;

  const activeTabRef = useRef<HTMLButtonElement>(null);
  const archiveTabRef = useRef<HTMLButtonElement>(null);

  const activeDocs = useMemo(() => documents.filter((d) => !d.isArchived), [documents]);
  const archiveDocs = useMemo(() => documents.filter((d) => !!d.isArchived), [documents]);

  const filterByQuery = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (list: CitizenDocument[]) =>
      q === ""
        ? list
        : list.filter(
            (d) =>
              d.name.toLowerCase().includes(q) ||
              (d.category ?? "").toLowerCase().includes(q),
          );
  }, [query]);

  const activeFiltered = useMemo(() => filterByQuery(activeDocs), [filterByQuery, activeDocs]);
  const archiveFiltered = useMemo(() => filterByQuery(archiveDocs), [filterByQuery, archiveDocs]);

  const current = tab === "archive" ? archiveFiltered : activeFiltered;
  const activeEmpty = activeFiltered.length === 0;
  const archiveEmpty = archiveFiltered.length === 0;

  // Ispis: okini window.print() tek kad je skrivena print-kartica iscrtana.
  useEffect(() => {
    if (!printDoc) return;
    const raf = requestAnimationFrame(() => window.print());
    return () => cancelAnimationFrame(raf);
  }, [printDoc]);

  // Po završetku (ili otkazivanju) ispisa očisti ciljni dokument.
  useEffect(() => {
    const handleAfterPrint = () => setPrintDoc(null);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  function selectTab(next: Tab, focus = false) {
    setTab(next);
    if (focus) {
      const ref = next === "active" ? activeTabRef : archiveTabRef;
      ref.current?.focus();
    }
  }

  function onTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight": {
        e.preventDefault();
        selectTab(tab === "active" ? "archive" : "active", true);
        break;
      }
      case "Home": {
        e.preventDefault();
        selectTab("active", true);
        break;
      }
      case "End": {
        e.preventDefault();
        selectTab("archive", true);
        break;
      }
    }
  }

  const clearSearchAction = (
    <button
      type="button"
      onClick={() => setQuery("")}
      className="eg-btn-primary eg-focusable"
      style={primaryBtnStyle}
    >
      Poništi pretragu
    </button>
  );

  function renderPanel(which: Tab) {
    const tabDocs = which === "archive" ? archiveDocs : activeDocs;
    const list = which === "archive" ? archiveFiltered : activeFiltered;

    if (tabDocs.length === 0) {
      return which === "archive" ? (
        <EmptyState
          icon={FolderOpen}
          title="Arhiva je prazna"
          description="Nemate arhiviranih dokumenata. Arhivirani dokumenti pojavit će se ovdje."
          minHeight="30vh"
        />
      ) : (
        <EmptyState
          icon={FileText}
          title="Nema dokumenata"
          description="Trenutačno nemate spremljenih dokumenata. Kad institucije izdaju dokument, pojavit će se ovdje."
          minHeight="30vh"
        />
      );
    }

    if (list.length === 0) {
      return (
        <EmptyState
          icon={SearchX}
          title="Nema rezultata za pretragu"
          description="Pokušajte promijeniti pojam pretrage ili poništite pretragu."
          minHeight="30vh"
          action={clearSearchAction}
        />
      );
    }

    return (
      <ul
        className="eg-divided-list"
        aria-label={which === "archive" ? "Arhivirani dokumenti" : "Aktivni dokumenti"}
        style={listStyle}
      >
        {list.map((doc) => (
          <DocumentRow key={doc.id} doc={doc} onPrint={setPrintDoc} />
        ))}
      </ul>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}>
      {/* ARIA tablist — Aktivni / Arhiva s roving tabIndex i strelicama. */}
      <div
        role="tablist"
        aria-label="Filtriraj dokumente"
        style={{ display: "flex", gap: "var(--space-sm)", borderBottom: "1px solid var(--color-border)" }}
      >
        <button
          ref={activeTabRef}
          type="button"
          role="tab"
          id={activeTabId}
          aria-selected={tab === "active"}
          aria-controls={activePanelId}
          tabIndex={tab === "active" ? 0 : -1}
          onClick={() => selectTab("active")}
          onKeyDown={onTabKeyDown}
          className="eg-focusable"
          style={tabStyle(tab === "active")}
        >
          Aktivni ({activeDocs.length})
        </button>
        <button
          ref={archiveTabRef}
          type="button"
          role="tab"
          id={archiveTabId}
          aria-selected={tab === "archive"}
          aria-controls={archivePanelId}
          tabIndex={tab === "archive" ? 0 : -1}
          onClick={() => selectTab("archive")}
          onKeyDown={onTabKeyDown}
          className="eg-focusable"
          style={tabStyle(tab === "archive")}
        >
          <span style={{ display: "inline-flex" }}>
            <Icon name="archive" size={18} />
          </span>
          Arhiva ({archiveDocs.length})
        </button>
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        label="Pretraži dokumente"
        placeholder="Pretraži dokumente (npr. domovnica, porez)…"
      />

      <p
        aria-live="polite"
        style={{ margin: 0, fontSize: "14px", color: "var(--color-text-muted)" }}
      >
        {`Pronađeno ${current.length} ${dokumentWord(current.length)}`}
      </p>

      {/* Oba tabpanela uvijek u DOM-u (neaktivni hidden) → aria-controls uvijek razriješen.
          tabIndex 0 samo kad je panel prazan (nema fokusabilnog sadržaja). */}
      <div
        role="tabpanel"
        id={activePanelId}
        aria-labelledby={activeTabId}
        hidden={tab !== "active"}
        tabIndex={activeEmpty ? 0 : undefined}
        className="eg-focusable"
      >
        {renderPanel("active")}
      </div>
      <div
        role="tabpanel"
        id={archivePanelId}
        aria-labelledby={archiveTabId}
        hidden={tab !== "archive"}
        tabIndex={archiveEmpty ? 0 : undefined}
        className="eg-focusable"
      >
        {renderPanel("archive")}
      </div>

      {/* Skrivena print-kartica — vidljiva samo pri ispisu (@media print u globals.css). */}
      {printDoc && (
        <div className="eg-print-card" aria-hidden="true">
          <h1 style={{ margin: "0 0 16px 0", fontFamily: "var(--font-display)" }}>
            {printDoc.name}
          </h1>
          <dl style={{ margin: 0, fontSize: "14px", lineHeight: 1.8 }}>
            <div>
              <dt style={{ display: "inline", fontWeight: 600 }}>Format: </dt>
              <dd style={{ display: "inline", margin: 0 }}>{printDoc.fileType}</dd>
            </div>
            <div>
              <dt style={{ display: "inline", fontWeight: 600 }}>Veličina: </dt>
              <dd style={{ display: "inline", margin: 0 }}>{printDoc.fileSize}</dd>
            </div>
            {printDoc.issuedAt && (
              <div>
                <dt style={{ display: "inline", fontWeight: 600 }}>Datum izdavanja: </dt>
                <dd style={{ display: "inline", margin: 0 }}>
                  {formatDate(printDoc.issuedAt)}
                </dd>
              </div>
            )}
            {printDoc.category && (
              <div>
                <dt style={{ display: "inline", fontWeight: 600 }}>Kategorija: </dt>
                <dd style={{ display: "inline", margin: 0 }}>{printDoc.category}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

const listStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-card)",
  overflow: "hidden",
};

const primaryBtnStyle: React.CSSProperties = {
  background: "var(--color-primary-strong)",
  color: "var(--color-on-primary)",
  border: "none",
  borderRadius: "var(--radius-md)",
  padding: "10px 24px",
  fontSize: "16px",
  fontWeight: 600,
  cursor: "pointer",
};

function tabStyle(selected: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    minHeight: "44px",
    padding: "0 16px",
    fontSize: "16px",
    fontWeight: 600,
    color: selected ? "var(--color-primary)" : "var(--color-text-muted)",
    background: "transparent",
    border: "none",
    borderBottom: selected
      ? "2px solid var(--color-primary)"
      : "2px solid transparent",
    cursor: "pointer",
    marginBottom: "-1px",
  };
}
