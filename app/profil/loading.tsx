import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

/** Loading stanje profila — avatar + kartice skeleton dok se profil dohvaća. */
export default function ProfilLoading() {
  return (
    <section aria-label="Moj profil">
      <h2 style={sectionHeading}>Moj profil</h2>

      <div
        role="status"
        aria-busy="true"
        aria-label="Učitavanje profila"
        style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}
      >
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <Skeleton height="64px" width="64px" />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              <Skeleton height="22px" width="160px" />
              <Skeleton height="14px" width="120px" />
            </div>
          </div>
        </Card>

        {[1, 2].map((i) => (
          <Card key={i}>
            <Skeleton height="16px" width="120px" />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} height="14px" width="100%" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
