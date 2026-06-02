import { useId } from "react";
import { RotateCcw } from "lucide-react";
import { AREAS, AUDIENCES, SECURITY_LEVELS } from "@/lib/mock-katalog";

export interface KatalogFilters {
  area: string;
  audience: string;
  security: string;
}

interface KatalogFilterBarProps {
  filters: KatalogFilters;
  onChange: (filters: KatalogFilters) => void;
  onReset: () => void;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 180px" }}>
      <label htmlFor={id} style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text)" }}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="eg-focusable eg-select"
        style={{ height: "48px", padding: "0 14px", fontSize: "16px", color: "var(--color-text)" }}
      >
        {options.map((o) => (
          <option key={o.value || "all"} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Filter traka: tri kontrolirana selecta + reset. Stanje drži roditelj (KatalogView). */
export function KatalogFilterBar({ filters, onChange, onReset }: KatalogFilterBarProps) {
  return (
    <div className="eg-filter-bar">
      <SelectField
        label="Područja"
        value={filters.area}
        onChange={(area) => onChange({ ...filters, area })}
        options={AREAS}
      />
      <SelectField
        label="Korisnici"
        value={filters.audience}
        onChange={(audience) => onChange({ ...filters, audience })}
        options={AUDIENCES}
      />
      <SelectField
        label="Sigurnost"
        value={filters.security}
        onChange={(security) => onChange({ ...filters, security })}
        options={SECURITY_LEVELS}
      />
      <button
        type="button"
        onClick={onReset}
        aria-label="Poništi filtre"
        className="eg-focusable eg-icon-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          alignSelf: "flex-end",
          height: "48px",
          padding: "0 16px",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--color-text)",
          cursor: "pointer",
        }}
      >
        <RotateCcw size={18} strokeWidth={2} aria-hidden="true" />
        Poništi
      </button>
    </div>
  );
}
