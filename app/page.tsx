import { StatCard } from "@/components/dashboard/StatCard";
import { CaseListItem } from "@/components/dashboard/CaseListItem";
import { DocListItem } from "@/components/dashboard/DocListItem";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import type {
  AsyncState,
  CitizenCase,
  CitizenDocument,
  DashboardStats,
} from "@/lib/types";

// Mock podaci — zamijeniti pravim API pozivima kad backend bude spreman.
const MOCK_STATS: AsyncState<DashboardStats> = {
  status: "success",
  data: { resolved: 12, inProgress: 3, awaitingPayment: 1 },
};

const MOCK_CASES: AsyncState<CitizenCase[]> = {
  status: "success",
  data: [
    {
      id: "1",
      title: "Zahtjev za parkirnu dozvolu",
      ref: "#8291",
      date: "2023-10-12",
      status: "resolved",
    },
    {
      id: "2",
      title: "Komunalni porez 2023",
      ref: "#9021",
      date: "2023-10-10",
      status: "awaiting-payment",
      amountDue: 48,
    },
    {
      id: "3",
      title: "Upit o gospodarenju otpadom",
      ref: "#7742",
      date: "2023-10-05",
      status: "in-progress",
    },
  ],
};

const MOCK_DOCS: AsyncState<CitizenDocument[]> = {
  status: "success",
  data: [
    { id: "1", name: "Potvrda o plaćenom porezu", fileType: "PDF", fileSize: "1.2 MB" },
    { id: "2", name: "Preslika osobne iskaznice", fileType: "PDF", fileSize: "0.8 MB" },
  ],
};

const STAT_CARDS: Array<{
  key: keyof DashboardStats;
  label: string;
  sublabel: string;
  icon: "check-circle" | "clock" | "alert-triangle";
  iconColor: string;
}> = [
  {
    key: "resolved",
    label: "Riješeno",
    sublabel: "Zadnjih 30 dana",
    icon: "check-circle",
    iconColor: "var(--color-success-icon)",
  },
  {
    key: "inProgress",
    label: "U obradi",
    sublabel: "Aktivni predmeti",
    icon: "clock",
    iconColor: "var(--color-warning-icon)",
  },
  {
    key: "awaitingPayment",
    label: "Čeka plaćanje",
    sublabel: "Rok za 2 dana",
    icon: "alert-triangle",
    iconColor: "var(--color-error)",
  },
];

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "24px",
  fontWeight: 600,
  color: "var(--color-text)",
};

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {/* Sažetak statistike */}
      <section aria-label="Sažetak">
        <div className="eg-stats">
          {STAT_CARDS.map(({ key, label, sublabel, icon, iconColor }) => {
            const cardState: AsyncState<number> =
              MOCK_STATS.status === "success"
                ? { status: "success", data: MOCK_STATS.data[key] }
                : MOCK_STATS;

            return (
              <StatCard
                key={key}
                label={label}
                sublabel={sublabel}
                icon={icon}
                iconColor={iconColor}
                state={cardState}
              />
            );
          })}
        </div>
      </section>

      {/* Moji predmeti */}
      <section aria-label="Moji predmeti">
        <h2 style={sectionHeading}>Moji predmeti</h2>

        {MOCK_CASES.status === "loading" && (
          <div
            aria-busy="true"
            aria-label="Učitavanje predmeta"
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
          >
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Skeleton height="18px" width="60%" />
                    <Skeleton height="14px" width="40%" />
                  </div>
                  <Skeleton height="28px" width="90px" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {MOCK_CASES.status === "error" && (
          <Card>
            <p role="alert" style={{ margin: 0, color: "var(--color-error)", fontSize: "16px" }}>
              {MOCK_CASES.message}
            </p>
          </Card>
        )}

        {MOCK_CASES.status === "success" && (
          <ul
            role="list"
            style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
          >
            {MOCK_CASES.data.map((item) => (
              <CaseListItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>

      {/* Dokumenti */}
      <section aria-label="Dokumenti">
        <h2 style={sectionHeading}>Dokumenti</h2>

        {MOCK_DOCS.status === "loading" && (
          <Card clip padding={0}>
            <div aria-busy="true" aria-label="Učitavanje dokumenata">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--space-md)",
                    borderBottom: i === 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Skeleton height="16px" width="180px" />
                    <Skeleton height="13px" width="100px" />
                  </div>
                  <Skeleton height="24px" width="24px" />
                </div>
              ))}
            </div>
          </Card>
        )}

        {MOCK_DOCS.status === "error" && (
          <Card>
            <p role="alert" style={{ margin: 0, color: "var(--color-error)", fontSize: "16px" }}>
              {MOCK_DOCS.message}
            </p>
          </Card>
        )}

        {MOCK_DOCS.status === "success" && (
          <Card clip padding={0}>
            <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {MOCK_DOCS.data.map((doc, i) => (
                <DocListItem key={doc.id} doc={doc} isLast={i === MOCK_DOCS.data.length - 1} />
              ))}
            </ul>
          </Card>
        )}
      </section>
    </div>
  );
}
