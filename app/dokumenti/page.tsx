import { DokumentiView } from "@/components/dokumenti/DokumentiView";
import { getDocuments } from "@/lib/mock-dokumenti";

export const metadata = {
  title: "Moji dokumenti — eGrađani",
};

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-sm) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

const sectionLead: React.CSSProperties = {
  margin: "0 0 var(--gutter) 0",
  fontSize: "var(--text-base)",
  color: "var(--color-text-muted)",
  maxWidth: "640px",
};

export default async function DokumentiPage() {
  const documents = await getDocuments();

  return (
    <section aria-label="Moji dokumenti">
      <h2 style={sectionHeading}>Moji dokumenti</h2>
      <p style={sectionLead}>
        Pregledajte i preuzmite svoje službene dokumente. Arhivirane dokumente
        pronađite na zasebnoj kartici.
      </p>
      <DokumentiView documents={documents} />
    </section>
  );
}
