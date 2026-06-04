import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/mock-katalog";

interface KatalogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Poznati slugovi se prerenderiraju; svaki drugi vraća stvarni 404 (ne 200 stream).
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

const sectionHeading: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

export default async function KatalogDetailPage({ params }: KatalogDetailPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <section
      aria-label={category.title}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
    >
      <Link
        href="/katalog"
        className="eg-focusable"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          alignSelf: "flex-start",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-primary)",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
        Natrag na katalog
      </Link>

      <h2 style={sectionHeading}>{category.title}</h2>

      <Card style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
        <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--color-text)" }}>
          Stranica je u pripremi.
        </p>
        <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--color-text-muted)" }}>
          {category.examples}
        </p>
      </Card>
    </section>
  );
}
