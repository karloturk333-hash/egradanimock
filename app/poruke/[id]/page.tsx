import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MessageDetail } from "@/components/messages/MessageDetail";
import { MESSAGES, getMessageById } from "@/lib/mock-messages";

interface PorukaDetailPageProps {
  params: Promise<{ id: string }>;
}

// Poznati ID-evi se prerenderiraju; svaki drugi vraća stvarni 404 (ne 200 stream).
export const dynamicParams = false;

export function generateStaticParams() {
  return MESSAGES.map((m) => ({ id: m.id }));
}

export default async function PorukaDetailPage({ params }: PorukaDetailPageProps) {
  const { id } = await params;
  const message = await getMessageById(id);

  if (!message) {
    notFound();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <Link
        href="/poruke"
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
        Natrag na pretinac
      </Link>

      <MessageDetail message={message} />
    </div>
  );
}
