/** Status badge varijante (dokumenti i opća stanja). */
export type StatusType = "active" | "pending" | "error" | "info";

/** Status predmeta na dashboardu. */
export type CaseStatus = "resolved" | "in-progress" | "awaiting-payment";

export interface CitizenDocument {
  id: string;
  name: string;
  /** Format datoteke, npr. "PDF". */
  fileType: string;
  /** Veličina datoteke, npr. "1.2 MB". */
  fileSize: string;
}

export interface CitizenCase {
  id: string;
  title: string;
  /** Referentni broj predmeta, npr. "#8291". */
  ref: string;
  /** ISO datum podnošenja. */
  date: string;
  status: CaseStatus;
  /** Iznos za platiti (EUR) — samo za status "awaiting-payment". */
  amountDue?: number;
}

export interface DashboardStats {
  /** Riješeni predmeti (zadnjih 30 dana). */
  resolved: number;
  /** Predmeti u obradi. */
  inProgress: number;
  /** Predmeti koji čekaju plaćanje. */
  awaitingPayment: number;
}

/** Tri stanja svakog dohvata podataka: učitavanje, greška, uspjeh. */
export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

/** Razina prijave (NIAS) potrebna za pristup uslugama kategorije. */
export type SecurityLevel = "none" | "nias1" | "nias2";

/**
 * Životno područje u katalogu usluga (/katalog). `icon` je string ključ
 * (ne komponenta) jer se kategorije serijaliziraju iz server u client komponentu;
 * mapiranje u Lucide ikonu radi se u `components/katalog/category-icons.ts`.
 */
export interface ServiceCategory {
  id: string;
  /** URL slug, npr. "obitelj-i-zivot". */
  slug: string;
  title: string;
  /** Kratki popis primjera usluga (jedan string, razdvojen znakom "·"). */
  examples: string;
  /** Ključ ikone iz category-icons.ts, npr. "users". */
  icon: string;
  /** Odredište kartice, npr. "/katalog/obitelj-i-zivot". */
  href: string;
  /** Životno područje za filtriranje (jednako title). */
  area: string;
  /** Ciljane skupine korisnika, npr. ["Građani", "Umirovljenici"]. */
  audiences: string[];
  security: SecurityLevel;
}

/** Poruka u korisničkom pretincu (inbox). */
export interface Message {
  id: string;
  /** Identifikator pošiljatelja (institucije). */
  senderId: string;
  /** Naziv pošiljatelja, npr. "Porezna uprava". */
  senderName: string;
  subject: string;
  /** Kratki tekst za prikaz u listi (max ~120 znakova). */
  preview: string;
  /** Puni sadržaj poruke (plain text). */
  body: string;
  /** ISO 8601, npr. "2026-05-28T09:15:00Z". */
  sentAt: string;
  isRead: boolean;
  isArchived: boolean;
}
