import type { Message } from "@/lib/types";

// MOCK_DELAY env var omogućuje 0 kašnjenja u testovima (usklađeno s lib/mock-data.ts).
const DELAY = process.env.MOCK_DELAY !== undefined ? Number(process.env.MOCK_DELAY) : 800;

/**
 * Mock poruke korisničkog pretinca. Zamijeniti pravim API pozivima kad backend
 * bude spreman. Datumi su ISO 8601 (UTC).
 */
export const MESSAGES: Message[] = [
  {
    id: "msg-1001",
    senderId: "mup",
    senderName: "MUP — Odjel za osobne dokumente",
    subject: "Vaša nova osobna iskaznica spremna je za preuzimanje",
    preview:
      "Poštovani, vaša osobna iskaznica izrađena je i spremna za preuzimanje u PU Zagreb, Petrinjska 30, šalter 4.",
    body: "Poštovani,\n\nobavještavamo Vas da je Vaša nova osobna iskaznica izrađena i spremna za preuzimanje.\n\nMjesto preuzimanja: Policijska uprava zagrebačka, Petrinjska 30, šalter 4.\nRadno vrijeme: ponedjeljak–petak, 8:00–16:00.\n\nPrilikom preuzimanja ponesite staru ispravu radi poništenja. Iskaznicu možete preuzeti i putem opunomoćene osobe uz ovjerenu punomoć.\n\nS poštovanjem,\nMinistarstvo unutarnjih poslova",
    sentAt: "2026-05-28T09:15:00Z",
    isRead: false,
    isArchived: false,
  },
  {
    id: "msg-1002",
    senderId: "porezna",
    senderName: "Porezna uprava",
    subject: "Obavijest o povratu poreza za 2025. godinu",
    preview:
      "Na temelju godišnjeg obračuna utvrđen je povrat poreza na dohodak. Sredstva će biti isplaćena na vaš IBAN.",
    body: "Poštovani,\n\nna temelju godišnjeg obračuna poreza na dohodak za 2025. godinu utvrđen je povrat u iznosu od 184,32 EUR.\n\nSredstva će biti isplaćena na IBAN evidentiran u sustavu ePorezna najkasnije do 30. lipnja 2026.\n\nDetaljan obračun dostupan je u rubrici „Moji dokumenti”.\n\nS poštovanjem,\nPorezna uprava",
    sentAt: "2026-05-26T11:40:00Z",
    isRead: false,
    isArchived: false,
  },
  {
    id: "msg-1003",
    senderId: "hzmo",
    senderName: "HZMO",
    subject: "Potvrda o radnom stažu izdana",
    preview:
      "Vaš zahtjev za izdavanje potvrde o radnom stažu je obrađen. Potvrda je dostupna u rubrici Dokumenti.",
    body: "Poštovani,\n\nVaš zahtjev za izdavanje elektroničkog zapisa o radnopravnom statusu (potvrda o radnom stažu) uspješno je obrađen.\n\nDokument je dostupan u rubrici „Moji dokumenti” i ima jednaku pravnu valjanost kao i potvrda izdana na šalteru.\n\nS poštovanjem,\nHrvatski zavod za mirovinsko osiguranje",
    sentAt: "2026-05-21T08:05:00Z",
    isRead: true,
    isArchived: false,
  },
  {
    id: "msg-1004",
    senderId: "hzzo",
    senderName: "HZZO",
    subject: "Promjena izabranog liječnika obiteljske medicine",
    preview:
      "Zaprimili smo vaš zahtjev za promjenu izabranog liječnika. U nastavku su koraci i rokovi obrade zahtjeva.",
    body: "Poštovani,\n\nzaprimili smo Vaš zahtjev za promjenu izabranog doktora obiteljske (opće) medicine.\n\nKako biste dovršili postupak, potrebno je obratiti pažnju na sljedeće:\n\n1. Promjena izabranog liječnika moguća je najranije nakon isteka 12 mjeseci od posljednje promjene, osim u opravdanim slučajevima (promjena prebivališta, prestanak rada ordinacije i sl.).\n\n2. Novi izabrani liječnik mora imati slobodan kapacitet za upis novih osiguranika. Popis ordinacija s otvorenim kapacitetom dostupan je na mrežnim stranicama HZZO-a.\n\n3. Nakon zaprimanja potpisane izjave o izboru, prijenos zdravstvenog kartona između ordinacija obavlja se elektronički u roku od 5 radnih dana.\n\n4. Do dovršetka prijenosa zdravstvenu zaštitu ostvarujete kod dosadašnjeg izabranog liječnika.\n\n5. O uspješno provedenoj promjeni bit ćete obaviješteni zasebnom porukom u ovom pretincu, a podatak će biti ažuriran i na Vašoj iskaznici zdravstvenog osiguranja.\n\nAko niste podnijeli ovaj zahtjev, molimo da nas odmah kontaktirate putem službene adrese ili na broj 0800 79 99 kako bismo zaštitili Vaše podatke.\n\nNapomena: ova poruka generirana je automatski na temelju podataka iz sustava e-Građani. Molimo da na nju ne odgovarate izravno; za upite koristite gumb „Odgovori”.\n\nS poštovanjem,\nHrvatski zavod za zdravstveno osiguranje",
    sentAt: "2026-05-18T14:22:00Z",
    isRead: false,
    isArchived: false,
  },
  {
    id: "msg-1005",
    senderId: "grad-zagreb",
    senderName: "Grad Zagreb — Gradska uprava",
    subject: "Rješenje o komunalnoj naknadi za 2026.",
    preview:
      "Doneseno je rješenje o komunalnoj naknadi. Uplatnice s pozivom na broj dostupne su u privitku rješenja.",
    body: "Poštovani,\n\nobavještavamo Vas da je doneseno rješenje o komunalnoj naknadi za 2026. godinu.\n\nMjesečni iznos i pozivi na broj navedeni su u rješenju dostupnom u rubrici „Moji dokumenti”. Prvo dospijeće je 15. lipnja 2026.\n\nS poštovanjem,\nGrad Zagreb",
    sentAt: "2026-05-12T07:30:00Z",
    isRead: true,
    isArchived: false,
  },
  {
    id: "msg-1006",
    senderId: "mup",
    senderName: "MUP — Odjel za osobne dokumente",
    subject: "Istek valjanosti putovnice — podsjetnik",
    preview:
      "Vaša putovnica istječe za manje od 6 mjeseci. Zahtjev za izdavanje nove možete predati elektronički.",
    body: "Poštovani,\n\npodsjećamo Vas da Vaša putovnica istječe za manje od 6 mjeseci. Zahtjev za izdavanje nove putne isprave možete predati elektronički ili na nadležnom šalteru.\n\nS poštovanjem,\nMinistarstvo unutarnjih poslova",
    sentAt: "2026-04-30T10:00:00Z",
    isRead: true,
    isArchived: true,
  },
];

/** Aktivne (nearhivirane) poruke, sortirane od najnovije prema najstarijoj. */
function activeMessages(): Message[] {
  return MESSAGES.filter((m) => !m.isArchived).sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
  );
}

/** Broj nepročitanih nearhiviranih poruka — jedini izvor istine za nav badge. */
export const UNREAD_COUNT = MESSAGES.filter(
  (m) => !m.isArchived && !m.isRead,
).length;

/**
 * Dohvat poruka za pretinac. Simulira mrežno kašnjenje i filtrira arhivirane.
 * Test seam: `EG_EMPTY_INBOX=1` vraća prazan pretinac (za provjeru praznog stanja).
 */
export async function getMessages(): Promise<Message[]> {
  await new Promise((r) => setTimeout(r, DELAY));
  if (process.env.EG_EMPTY_INBOX === "1") return [];
  return activeMessages();
}

/** Dohvat jedne poruke po ID-u (uključuje i arhivirane). */
export async function getMessageById(id: string): Promise<Message | undefined> {
  await new Promise((r) => setTimeout(r, DELAY * 0.5));
  return MESSAGES.find((m) => m.id === id);
}
