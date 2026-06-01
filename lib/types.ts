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
