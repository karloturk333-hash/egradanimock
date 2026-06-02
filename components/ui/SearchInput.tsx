import { useId } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Tekst labela (vezan preko htmlFor). */
  label: string;
  placeholder?: string;
  /** Sakrij vidljivi label (ostaje dostupan čitačima ekrana). */
  labelHidden?: boolean;
}

/**
 * Kontrolirano polje za pretragu (type="search") s ikonom i pravim <label>.
 * Bez vlastitog stanja — vrijednost i promjena dolaze odozgo.
 */
export function SearchInput({
  value,
  onChange,
  label,
  placeholder,
  labelHidden = true,
}: SearchInputProps) {
  const id = useId();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
      <label
        htmlFor={id}
        className={labelHidden ? "eg-sr-only" : undefined}
        style={
          labelHidden
            ? undefined
            : { fontSize: "14px", fontWeight: 600, color: "var(--color-text)" }
        }
      >
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <Search
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "14px",
            color: "var(--color-text-muted)",
            pointerEvents: "none",
          }}
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="eg-focusable eg-select"
          style={{
            width: "100%",
            height: "48px",
            padding: "0 16px 0 44px",
            fontSize: "16px",
            color: "var(--color-text)",
            background: "var(--color-surface)",
          }}
        />
      </div>
    </div>
  );
}
