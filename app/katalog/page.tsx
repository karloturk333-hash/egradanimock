import { KatalogView } from "@/components/katalog/KatalogView";
import { getCategories } from "@/lib/mock-katalog";

export const metadata = {
  title: "Katalog usluga — eGrađani",
};

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-sm) 0",
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const sectionLead: React.CSSProperties = {
  margin: "0 0 var(--gutter) 0",
  fontSize: "16px",
  color: "var(--color-text-muted)",
  maxWidth: "640px",
};

export default async function KatalogPage() {
  const categories = await getCategories();

  return (
    <section aria-label="Katalog usluga">
      <h2 style={sectionHeading}>Katalog usluga</h2>
      <p style={sectionLead}>
        Pronađite državne usluge po životnim područjima. Odaberite kategoriju za popis
        povezanih e-usluga.
      </p>
      <KatalogView categories={categories} />
    </section>
  );
}
