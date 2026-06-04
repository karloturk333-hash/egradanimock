import { Skeleton } from "@/components/ui/Skeleton";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-sm) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

/** Loading stanje kataloga — 6 skeleton kartica dok se kategorije dohvaćaju. */
export default function KatalogLoading() {
  return (
    <section aria-label="Katalog usluga">
      <h2 style={sectionHeading}>Katalog usluga</h2>

      <ul aria-busy="true" aria-label="Učitavanje kataloga" className="eg-katalog-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <li
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
            }}
          >
            <Skeleton height="48px" width="48px" />
            <Skeleton height="18px" width="60%" />
            <Skeleton height="14px" width="95%" />
            <Skeleton height="14px" width="80%" />
          </li>
        ))}
      </ul>
    </section>
  );
}
