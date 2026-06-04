import { getCases } from "@/lib/mock-predmeti";
import { PredmetiView } from "@/components/predmeti/PredmetiView";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-sm) 0",
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const lead: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontSize: "15px",
  color: "var(--color-text-muted)",
};

export default async function PredmetiPage() {
  const cases = await getCases();

  return (
    <section aria-label="Moji predmeti">
      <h2 style={sectionHeading}>Moji predmeti</h2>
      <p style={lead}>Pregled vaših zahtjeva i postupaka. Filtrirajte po statusu ili pretražite.</p>
      <PredmetiView cases={cases} />
    </section>
  );
}
