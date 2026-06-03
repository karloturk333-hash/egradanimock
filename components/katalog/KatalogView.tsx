"use client";

import { useMemo, useState } from "react";
import { SearchX, Landmark } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { KatalogCard } from "@/components/katalog/KatalogCard";
import { KatalogFilterBar, type KatalogFilters } from "@/components/katalog/KatalogFilterBar";
import { iconFor } from "@/components/katalog/category-icons";
import type { ServiceCategory } from "@/lib/types";

const EMPTY_FILTERS: KatalogFilters = { area: "", audience: "", security: "" };

/** Hrvatska sklonidba: 1 usluga · 2–4 usluge · 0/5+ usluga (iznimke 11–14). */
function uslugaWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "usluga";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "usluge";
  return "usluga";
}

interface KatalogViewProps {
  categories: ServiceCategory[];
}

/**
 * Orkestrator kataloga (client). Drži pretragu + tri filtera i izvodi
 * filtriranu listu. Razlikuje dva prazna stanja:
 *  - prazno-backend: categories.length === 0 (npr. EG_EMPTY_KATALOG)
 *  - prazno-filtera: ima kategorija, ali nijedna ne prolazi filtre
 */
export function KatalogView({ categories }: KatalogViewProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<KatalogFilters>(EMPTY_FILTERS);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter((c) => {
      const matchesQuery =
        q === "" ||
        c.title.toLowerCase().includes(q) ||
        c.examples.toLowerCase().includes(q);
      const matchesArea = filters.area === "" || c.area === filters.area;
      const matchesAudience =
        filters.audience === "" || c.audiences.includes(filters.audience);
      const matchesSecurity = filters.security === "" || c.security === filters.security;
      return matchesQuery && matchesArea && matchesAudience && matchesSecurity;
    });
  }, [categories, query, filters]);

  function resetFilters() {
    setQuery("");
    setFilters(EMPTY_FILTERS);
  }

  // Prazno-backend: katalog nedostupan ili bez stavki.
  if (categories.length === 0) {
    return (
      <EmptyState
        icon={Landmark}
        title="Katalog je trenutačno nedostupan"
        description="Popis usluga trenutačno nije moguće prikazati. Pokušajte ponovno kasnije."
        minHeight="40vh"
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}>
      <SearchInput
        value={query}
        onChange={setQuery}
        label="Pretraži usluge"
        placeholder="Pretraži usluge (npr. putovnica, vrtić, porez)…"
      />

      <KatalogFilterBar filters={filters} onChange={setFilters} onReset={resetFilters} />

      <p aria-live="polite" style={{ margin: 0, fontSize: "14px", color: "var(--color-text-muted)" }}>
        {`Pronađeno ${filtered.length} ${uslugaWord(filtered.length)}`}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Nema usluga za odabrane filtre"
          description="Pokušajte promijeniti pretragu ili poništite filtre."
          minHeight="30vh"
          action={
            <button
              type="button"
              onClick={resetFilters}
              className="eg-btn-primary eg-focusable"
              style={{
                background: "var(--color-primary-strong)",
                color: "var(--color-on-primary)",
                border: "none",
                borderRadius: "var(--radius-md)",
                padding: "10px 24px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Poništi filtre
            </button>
          }
        />
      ) : (
        <ul className="eg-katalog-grid" aria-label="Popis usluga">
          {filtered.map((c) => (
            <li key={c.id} style={{ display: "flex" }}>
              <KatalogCard
                icon={iconFor(c.icon)}
                title={c.title}
                examples={c.examples}
                href={c.href}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
