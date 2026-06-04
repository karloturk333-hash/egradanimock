import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DOCUMENTS, getDocumentBySlug } from "@/lib/mock-dokumenti";
import { formatDate } from "@/lib/format";

interface DokumentPreviewPageProps {
  params: Promise<{ slug: string }>;
}

// Poznati slugovi se prerenderiraju; svaki drugi vraća stvarni 404 (ne 200 stream).
export const dynamicParams = false;

export function generateStaticParams() {
  return DOCUMENTS.filter((d) => d.slug).map((d) => ({ slug: d.slug as string }));
}

const backLink: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-sm)",
  alignSelf: "flex-start",
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  color: "var(--color-primary)",
  textDecoration: "none",
};

const sectionHeading: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

const downloadBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-sm)",
  alignSelf: "flex-start",
  minHeight: "44px",
  padding: "0 20px",
  background: "var(--color-primary-strong)",
  color: "var(--color-on-primary)",
  borderRadius: "var(--radius-md)",
  fontSize: "var(--text-base)",
  fontWeight: 600,
  textDecoration: "none",
};

export default async function DokumentPreviewPage({ params }: DokumentPreviewPageProps) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);

  if (!doc) {
    notFound();
  }

  const meta = [
    doc.fileType,
    doc.fileSize,
    doc.issuedAt ? formatDate(doc.issuedAt) : undefined,
    doc.category,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      aria-label={doc.name}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
    >
      <Link href="/dokumenti" className="eg-focusable" style={backLink}>
        <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
        Natrag na dokumente
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <h2 style={sectionHeading}>{doc.name}</h2>
        {doc.isArchived && <Badge tone="neutral" label="Arhivirano" />}
      </div>
      <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{meta}</p>

      <a href={doc.downloadUrl} download={`${doc.name}.pdf`} className="eg-focusable" style={downloadBtn}>
        <Download size={18} strokeWidth={2} aria-hidden="true" />
        Preuzmi PDF
      </a>

      <Card padding={0} clip style={{ marginTop: "var(--space-sm)" }}>
        <iframe
          src={doc.downloadUrl}
          title={`Pregled dokumenta: ${doc.name}`}
          style={{ width: "100%", height: "72vh", border: 0, display: "block" }}
        />
      </Card>

      <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
        Ako se pregled ne prikazuje,{" "}
        <a
          href={doc.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eg-focusable"
          style={{ color: "var(--color-primary)" }}
        >
          otvorite PDF u novoj kartici
        </a>
        .
      </p>
    </section>
  );
}
