import { getProfile } from "@/lib/mock-profil";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProfilPostavke } from "@/components/profil/ProfilPostavke";
import { formatDate } from "@/lib/format";
import type { CitizenProfile } from "@/lib/types";

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const cardTitle: React.CSSProperties = {
  margin: "0 0 var(--space-sm) 0",
  fontFamily: "var(--font-sans)",
  fontSize: "16px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const NIAS_LABEL: Record<CitizenProfile["niasLevel"], string> = {
  nias1: "Osnovna razina (NIAS 1)",
  nias2: "Visoka razina (NIAS 2)",
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "8px 0" }}>
      <dt style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>{label}</dt>
      <dd
        style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--color-text)",
          textAlign: "right",
        }}
      >
        {value}
      </dd>
    </div>
  );
}

export default async function ProfilPage() {
  const p = await getProfile();

  return (
    <section
      aria-label="Moj profil"
      style={{ display: "flex", flexDirection: "column", gap: "var(--gutter)" }}
    >
      <h2 style={sectionHeading}>Moj profil</h2>

      {/* Zaglavlje: avatar + ime + status vjerodajnice */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div
            aria-hidden="true"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-primary-strong)",
              color: "var(--color-on-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {p.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              {p.fullName}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
              <Badge tone="success" label="Potvrđen identitet" />
              <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                Korisnik od {formatDate(p.memberSince)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Osobni podaci */}
      <Card>
        <h3 style={cardTitle}>Osobni podaci</h3>
        <dl style={{ margin: 0 }}>
          <Field label="OIB" value={p.oib} />
          <Field label="Datum rođenja" value={formatDate(p.dateOfBirth)} />
          <Field label="Razina vjerodajnice" value={NIAS_LABEL[p.niasLevel]} />
        </dl>
      </Card>

      {/* Kontakt */}
      <Card>
        <h3 style={cardTitle}>Kontakt</h3>
        <dl style={{ margin: 0 }}>
          <Field label="E-pošta" value={p.email} />
          <Field label="Telefon" value={p.phone} />
          <Field label="Adresa" value={p.address} />
        </dl>
      </Card>

      {/* Postavke obavijesti (interaktivno) */}
      <Card>
        <h3 style={cardTitle}>Postavke obavijesti</h3>
        <ProfilPostavke initial={p.notifications} />
      </Card>
    </section>
  );
}
