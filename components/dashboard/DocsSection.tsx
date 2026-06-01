import { fetchDocuments } from "@/lib/mock-data"
import { DocListItem } from "@/components/dashboard/DocListItem"
import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"

export async function DocsSection() {
  const docs = await fetchDocuments()
  return (
    <Card clip padding={0}>
      <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {docs.map((doc, i) => (
          <DocListItem key={doc.id} doc={doc} isLast={i === docs.length - 1} />
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
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Skeleton height="16px" width="180px" />
            <Skeleton height="13px" width="100px" />
          </div>
          <Skeleton height="24px" width="24px" />
        </div>
      ))}
    </Card>
  )
}
