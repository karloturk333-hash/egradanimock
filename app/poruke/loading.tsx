import { Skeleton } from "@/components/ui/Skeleton";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

/** Loading stanje pretinca — 4 skeleton reda dok se poruke dohvaćaju. */
export default function PorukeLoading() {
  return (
    <section aria-label="Korisnički pretinac">
      <h2 style={sectionHeading}>Korisnički pretinac</h2>

      <ul
        aria-busy="true"
        aria-label="Učitavanje poruka"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <li
            key={i}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderLeft: "4px solid transparent",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              <Skeleton height="14px" width="45%" />
              <Skeleton height="14px" width="48px" />
            </div>
            <Skeleton height="16px" width="75%" />
            <Skeleton height="14px" width="90%" />
          </li>
        ))}
      </ul>
    </section>
  );
}
