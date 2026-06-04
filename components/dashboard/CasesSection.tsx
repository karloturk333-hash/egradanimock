import { Folder } from "lucide-react"
import { fetchCases } from "@/lib/mock-data"
import { CaseListItem } from "@/components/dashboard/CaseListItem"
import { EmptyState } from "@/components/ui/EmptyState"
import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"

export async function CasesSection() {
  const cases = await fetchCases()
  if (cases.length === 0) {
    return (
      <EmptyState
        icon={Folder}
        title="Nemate aktivnih predmeta"
        description="Kad podnesete zahtjev ili predmet, pojavit će se ovdje."
      />
    )
  }
  return (
    <ul
      role="list"
      style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
    >
      {cases.map(item => (
        <CaseListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export function CasesSkeleton() {
  return (
    <div aria-busy="true" aria-label="Učitavanje predmeta" style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      {[1, 2, 3].map(i => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              <Skeleton height="18px" width="60%" />
              <Skeleton height="14px" width="40%" />
            </div>
            <Skeleton height="28px" width="90px" />
          </div>
        </Card>
      ))}
    </div>
  )
}
