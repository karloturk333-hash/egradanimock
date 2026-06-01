import { fetchDashboardStats } from "@/lib/mock-data"
import { StatCard } from "@/components/dashboard/StatCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"
import type { DashboardStats } from "@/lib/types"
import type { IconName } from "@/components/ui/Icon"

const STAT_CARDS: Array<{
  key: keyof DashboardStats
  label: string
  sublabel: string
  icon: IconName
  iconColor: string
}> = [
  { key: "resolved", label: "Riješeno", sublabel: "Zadnjih 30 dana", icon: "check-circle", iconColor: "var(--color-success-icon)" },
  { key: "inProgress", label: "U obradi", sublabel: "Aktivni predmeti", icon: "clock", iconColor: "var(--color-warning-icon)" },
  { key: "awaitingPayment", label: "Čeka plaćanje", sublabel: "Rok za 2 dana", icon: "alert-triangle", iconColor: "var(--color-error)" },
]

export async function StatsSection() {
  const stats = await fetchDashboardStats()
  return (
    <div className="eg-stats">
      {STAT_CARDS.map(({ key, label, sublabel, icon, iconColor }) => (
        <StatCard
          key={key}
          label={label}
          sublabel={sublabel}
          icon={icon}
          iconColor={iconColor}
          state={{ status: "success", data: stats[key] }}
        />
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="eg-stats" aria-busy="true" aria-label="Učitavanje statistike">
      {[1, 2, 3].map(i => (
        <Card key={i} style={{ minWidth: "150px", flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Skeleton height="20px" width="100px" />
            <Skeleton height="32px" width="48px" />
            <Skeleton height="14px" width="90px" />
          </div>
        </Card>
      ))}
    </div>
  )
}
