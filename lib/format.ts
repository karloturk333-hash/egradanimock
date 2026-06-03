// Centralizirano formatiranje datuma — jedan izvor istine za hr-HR lokalizaciju.
// Izbjegava duplikaciju (prije: CaseListItem i MessageListItem su imali vlastite formatere).
const LOCALE = "hr-HR";

/** Puni datum s godinom — npr. "12. lis 2023." (predmeti, dokumenti). */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Kratki datum bez godine — npr. "28. svi" (lista poruka, kompaktni redovi). */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "short",
  });
}

/** Puni datum i vrijeme — npr. "28. svibnja 2026. u 09:15" (detalj poruke). */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
