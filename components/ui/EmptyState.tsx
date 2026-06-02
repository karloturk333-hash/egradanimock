import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  /** Lucide ikona (npr. Folder, FileText, MailOpen). */
  icon: LucideIcon;
  title: string;
  description: string;
  /** Razina naslova radi ispravne hijerarhije (default 3 — sekcije dashboarda već imaju h2). */
  headingLevel?: 2 | 3;
  /** Veći vertikalni prostor (npr. cijeli inbox). Izostavi za kompaktne sekcije. */
  minHeight?: string;
  /** Opcionalna akcija (npr. gumb „Poništi filtre”) ispod opisa. */
  action?: React.ReactNode;
}

/**
 * Reusable prazno stanje (ikona + naslov + opis). Dijele ga predmeti, dokumenti i inbox.
 * Bez stanja/hookova → radi i u server i u client komponentama.
 */
export function EmptyState({ icon: Icon, title, description, headingLevel = 3, minHeight, action }: EmptyStateProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "var(--space-md)",
        padding: "var(--space-lg) var(--space-md)",
        minHeight,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "72px",
          height: "72px",
          borderRadius: "var(--radius-pill)",
          background: "var(--color-surface-3)",
          color: "var(--color-primary)",
        }}
      >
        <Icon size={34} strokeWidth={1.75} />
      </span>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Heading
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 600,
            color: "var(--color-text)",
          }}
        >
          {title}
        </Heading>
        <p style={{ margin: 0, fontSize: "16px", color: "var(--color-text-muted)", maxWidth: "320px" }}>
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}
