import { FileText } from "lucide-react"
import { fetchDocuments } from "@/lib/mock-data"
import { DocListItem } from "@/components/dashboard/DocListItem"
import { EmptyState } from "@/components/ui/EmptyState"
import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"

export async function DocsSection() {
  const docs = await fetchDocuments()
  if (docs.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Nemate dokumenata"
        description="Vaše potvrde i dokumenti pojavit će se ovdje."
      />
    )
  }
  return (
    <Card clip padding={0}>
      <ul className="eg-divided-list" role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {docs.map(doc => (
          <DocListItem key={doc.id} doc={doc} />
        ))}
      </ul>
    </Card>
  )
}

export function DocsSkeleton() {
  return (
    <Card clip padding={0} aria-busy="true" aria-label="Učitavanje dokumenata">
      {[1, 2].map(i => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--space-md)",
            borderBottom: i === 1 ? "none" : "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <Skeleton height="16px" width="180px" />
            <Skeleton height="13px" width="100px" />
          </div>
          <Skeleton height="24px" width="24px" />
        </div>
      ))}
    </Card>
  )
}
