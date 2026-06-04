import { fetchDashboardStats } from "@/lib/mock-data"
import { StatCard, type StatColor } from "@/components/dashboard/StatCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"
import type { DashboardStats } from "@/lib/types"
import type { IconName } from "@/components/ui/Icon"

const STAT_CARDS: Array<{
  key: keyof DashboardStats
  label: string
  sublabel: string
  icon: IconName
  iconColor: StatColor
}> = [
  { key: "resolved", label: "Riješeno", sublabel: "Zadnjih 30 dana", icon: "check-circle", iconColor: "success" },
  { key: "inProgress", label: "U obradi", sublabel: "Aktivni predmeti", icon: "clock", iconColor: "warning" },
  { key: "awaitingPayment", label: "Čeka plaćanje", sublabel: "Rok za 2 dana", icon: "alert-triangle", iconColor: "error" },
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
        <Card key={i}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <Skeleton height="20px" width="100px" />
            <Skeleton height="32px" width="48px" />
            <Skeleton height="14px" width="90px" />
          </div>
        </Card>
      ))}
    </div>
  )
}
