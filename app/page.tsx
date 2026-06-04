import { Suspense } from "react"
import { StatsSection, StatsSkeleton } from "@/components/dashboard/StatsSection"
import { CasesSection, CasesSkeleton } from "@/components/dashboard/CasesSection"
import { DocsSection, DocsSkeleton } from "@/components/dashboard/DocsSection"

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
}

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      <section aria-label="Sažetak">
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSection />
        </Suspense>
      </section>

      <section aria-label="Moji predmeti">
        <h2 style={sectionHeading}>Moji predmeti</h2>
        <Suspense fallback={<CasesSkeleton />}>
          <CasesSection />
        </Suspense>
      </section>

      <section aria-label="Dokumenti">
        <h2 style={sectionHeading}>Dokumenti</h2>
        <Suspense fallback={<DocsSkeleton />}>
          <DocsSection />
        </Suspense>
      </section>
    </div>
  )
}
