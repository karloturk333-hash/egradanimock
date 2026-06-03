import {
  Users,
  HeartPulse,
  Briefcase,
  GraduationCap,
  Coins,
  Scale,
  Car,
  Home,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapiranje string ključa ikone (iz ServiceCategory.icon) u Lucide komponentu.
 * Ključevi se serijaliziraju iz server u client komponentu; mapiranje se radi
 * tek u clientu (KatalogView) prije rendera kartica.
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  users: Users,
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  coins: Coins,
  scale: Scale,
  car: Car,
  home: Home,
};

/** Dohvat ikone uz siguran fallback za nepoznat ključ. */
export function iconFor(key: string): LucideIcon {
  return CATEGORY_ICONS[key] ?? LayoutGrid;
}
