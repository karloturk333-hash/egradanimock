"use client";

import { useMemo, useState } from "react";
import { FolderOpen, SearchX } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { CaseListItem } from "@/components/dashboard/CaseListItem";
import type { CitizenCase, CaseStatus } from "@/lib/types";

type Filter = "all" | CaseStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Svi" },
  { key: "in-progress", label: "U obradi" },
  { key: "awaiting-payment", label: "Čeka plaćanje" },
  { key: "resolved", label: "Riješeno" },
];

/** Hrvatska sklonidba: 1 predmet, ostalo predmeta. */
function predmetWord(n: number): string {
  return n % 10 === 1 && n % 100 !== 11 ? "predmet" : "predmeta";
}

interface PredmetiViewProps {
  cases: CitizenCase[];
}

export function PredmetiView({ cases }: PredmetiViewProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      const matchesStatus = filter === "all" || c.status === filter;
      const matchesQuery =
        q === "" || c.title.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [cases, query, filter]);

  // Prazno-backend: nema nijednog predmeta.
  if (cases.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="Nema predmeta"
        description="Trenutačno nemate aktivnih predmeta. Novi zahtjevi pojavit će se ovdje."
        minHeight="40vh"
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}>
      <SearchInput
        value={query}
        onChange={setQuery}
        label="Pretraži predmete"
        placeholder="Pretraži predmete (npr. porez, dozvola)…"
      />

      <div
        role="group"
        aria-label="Filtriraj po statusu"
        style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className="eg-focusable"
            style={filterChip(filter === f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
        {`Pronađeno ${filtered.length} ${predmetWord(filtered.length)}`}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Nema predmeta za odabrane uvjete"
          description="Pokušajte promijeniti pretragu ili filter statusa."
          minHeight="30vh"
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="eg-btn-primary eg-focusable"
              style={primaryBtn}
            >
              Poništi filtre
            </button>
          }
        />
      ) : (
        <ul
          aria-label="Popis predmeta"
          style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
        >
          {filtered.map((c) => (
            <CaseListItem key={c.id} item={c} />
          ))}
        </ul>
      )}
    </div>
  );
}

function filterChip(active: boolean): React.CSSProperties {
  return {
    minHeight: "44px",
    padding: "0 16px",
    borderRadius: "var(--radius-pill)",
    border: active ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
    background: active ? "var(--color-primary-subtle)" : "var(--color-surface)",
    color: active ? "var(--color-primary)" : "var(--color-text)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    cursor: "pointer",
  };
}

const primaryBtn: React.CSSProperties = {
  background: "var(--color-primary-strong)",
  color: "var(--color-on-primary)",
  border: "none",
  borderRadius: "var(--radius-md)",
  padding: "10px 24px",
  fontSize: "var(--text-base)",
  fontWeight: 600,
  cursor: "pointer",
};
