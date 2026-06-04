import { Skeleton } from "@/components/ui/Skeleton";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-sm) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

/** Loading stanje dokumenata — placeholder kartica + 4 skeleton reda dok se dokumenti dohvaćaju. */
export default function DokumentiLoading() {
  return (
    <section aria-label="Moji dokumenti">
      <h2 style={sectionHeading}>Moji dokumenti</h2>

      <div
        role="status"
        aria-busy="true"
        aria-label="Učitavanje dokumenata"
        style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}
      >
        {/* Tablist placeholder */}
        <div style={{ display: "flex", gap: "var(--space-sm)" }}>
          <Skeleton height="40px" width="120px" />
          <Skeleton height="40px" width="120px" />
        </div>

        {/* Search placeholder */}
        <Skeleton height="48px" width="100%" />

        {/* Lista placeholder */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            overflow: "hidden",
          }}
          className="eg-divided-list"
        >
          {[1, 2, 3, 4].map((i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "var(--space-md)",
              }}
            >
              <Skeleton height="22px" width="22px" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                <Skeleton height="16px" width="50%" />
                <Skeleton height="14px" width="75%" />
              </div>
              <Skeleton height="44px" width="44px" />
              <Skeleton height="44px" width="44px" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
