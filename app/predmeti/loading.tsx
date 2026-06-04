import { Skeleton } from "@/components/ui/Skeleton";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: 600,
  color: "var(--color-text)",
};

/** Loading stanje predmeta — pretraga + filter + skeleton kartice. */
export default function PredmetiLoading() {
  return (
    <section aria-label="Moji predmeti">
      <h2 style={sectionHeading}>Moji predmeti</h2>

      <div
        role="status"
        aria-busy="true"
        aria-label="Učitavanje predmeta"
        style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}
      >
        <Skeleton height="48px" width="100%" />
        <div style={{ display: "flex", gap: "var(--space-sm)" }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="40px" width="90px" />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-card)",
                padding: "var(--space-md)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <Skeleton height="16px" width="55%" />
                <Skeleton height="14px" width="35%" />
              </div>
              <Skeleton height="28px" width="90px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
