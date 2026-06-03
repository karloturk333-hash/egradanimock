import {
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Download,
  Bell,
  Home,
  Folder,
  User,
  ChevronRight,
  Mail,
  Printer,
  Archive,
  type LucideIcon,
} from "lucide-react"

export type IconName =
  | "check-circle"
  | "clock"
  | "alert-triangle"
  | "file-text"
  | "download"
  | "bell"
  | "home"
  | "folder"
  | "user"
  | "chevron-right"
  | "mail"
  | "printer"
  | "archive"

const ICONS: Record<IconName, LucideIcon> = {
  "check-circle": CheckCircle,
  clock: Clock,
  "alert-triangle": AlertTriangle,
  "file-text": FileText,
  download: Download,
  bell: Bell,
  home: Home,
  folder: Folder,
  user: User,
  "chevron-right": ChevronRight,
  mail: Mail,
  printer: Printer,
  archive: Archive,
}

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
}

export function Icon({ name, size = 20, strokeWidth = 2 }: IconProps) {
  const LucideComponent = ICONS[name]
  return <LucideComponent size={size} strokeWidth={strokeWidth} aria-hidden="true" focusable={false} />
}
