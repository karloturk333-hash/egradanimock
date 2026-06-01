import type { IconName } from "@/components/ui/Icon";

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Početna", icon: "home" },
  { href: "/predmeti", label: "Predmeti", icon: "folder" },
  { href: "/dokumenti", label: "Dokumenti", icon: "file-text" },
  { href: "/profil", label: "Profil", icon: "user" },
];
