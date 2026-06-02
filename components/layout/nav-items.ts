import { Mail, LayoutGrid, type LucideIcon } from "lucide-react";
import type { IconName } from "@/components/ui/Icon";
import { UNREAD_COUNT } from "@/lib/mock-messages";

export interface NavItem {
  href: string;
  label: string;
  /** Ime ikone iz custom Icon seta ili lucide-react komponenta. */
  icon: IconName | LucideIcon;
  /** Broj nepročitanih (badge u navigaciji). */
  unreadCount?: number;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Početna", icon: "home" },
  { href: "/katalog", label: "Katalog", icon: LayoutGrid },
  { href: "/predmeti", label: "Predmeti", icon: "folder" },
  { href: "/poruke", label: "Poruke", icon: Mail, unreadCount: UNREAD_COUNT },
  { href: "/dokumenti", label: "Dokumenti", icon: "file-text" },
  { href: "/profil", label: "Profil", icon: "user" },
];
