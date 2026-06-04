import Link from "next/link";
import { Landmark } from "lucide-react";

interface FooterLink {
  label: string;
  /** Interni path, vanjski URL ili tel:; izostavljen → običan tekst (ne-link). */
  href?: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "O portalu",
    links: [
      { label: "O portalu", href: "#" },
      { label: "Katalog usluga", href: "/katalog" },
      { label: "Najčešća pitanja", href: "#" },
      { label: "Izjava o pristupačnosti", href: "#" },
    ],
  },
  {
    title: "Korisni linkovi",
    links: [
      { label: "Moja e-Građani", href: "#" },
      { label: "Središnji portal gov.hr", href: "https://gov.hr", external: true },
      { label: "e-Usluge", href: "#" },
      { label: "NIAS prijava", href: "#" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "Korisnička podrška", href: "#" },
      { label: "Kontakt obrazac", href: "#" },
      { label: "Telefon: 072 200 027", href: "tel:072200027", external: true },
      { label: "Radno vrijeme: pon–pet 8–16" },
    ],
  },
  {
    title: "Pravne informacije",
    links: [
      { label: "Uvjeti korištenja", href: "#" },
      { label: "Politika privatnosti", href: "#" },
      { label: "Kolačići", href: "#" },
      { label: "Zaštita osobnih podataka", href: "#" },
    ],
  },
];

const linkStyle: React.CSSProperties = {
  fontSize: "var(--text-base)",
  color: "var(--color-text-muted)",
  textDecoration: "none",
};

function FooterItem({ link }: { link: FooterLink }) {
  if (!link.href) {
    return <span style={{ ...linkStyle }}>{link.label}</span>;
  }
  if (link.external) {
    return (
      <a href={link.href} className="eg-focusable" style={linkStyle}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className="eg-focusable" style={linkStyle}>
      {link.label}
    </Link>
  );
}

/**
 * Globalno podnožje (renderira se u app/layout.tsx). Naslovi stupaca su
 * prezentacijski (styled span, ne heading) da ne onečiste per-page heading
 * outline. Footer je izvan .eg-main pa nosi vlastiti mobilni padding-bottom.
 */
export function SiteFooter() {
  return (
    <footer
      aria-label="Podnožje"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        marginTop: "var(--space-lg)",
        padding: "var(--space-lg) var(--space-md) calc(96px + var(--space-lg))",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="eg-footer-cols">
          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "2px",
                }}
              >
                {col.title}
              </span>
              {col.links.map((link) => (
                <FooterItem key={link.label} link={link} />
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--space-md)",
            marginTop: "var(--space-lg)",
            paddingTop: "var(--space-md)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-surface-3)",
              color: "var(--color-primary)",
              flexShrink: 0,
            }}
          >
            <Landmark size={22} strokeWidth={2} />
          </span>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
            © 2026 Vlada Republike Hrvatske
          </p>
          <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
            Sufinancirano sredstvima Europske unije
          </p>
        </div>
      </div>
    </footer>
  );
}
