// Generira prave (valjane) PDF dokumente za /dokumenti mock — bez vanjskih ovisnosti.
// Pokretanje: node scripts/generate-pdfs.cjs  → public/datoteke/<slug>.pdf
// (Putanja /datoteke izbjegava koliziju sa /dokumenti/[slug] rutom.)
// Helvetica (standardni font) + WinAnsiEncoding. č/ć/đ se foldaju na c/c/d
// (nisu u WinAnsi); š/ž/Š/Ž ostaju ispravni. Sadržaj je mock, samo za demonstraciju.
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "public", "datoteke");
fs.mkdirSync(OUT, { recursive: true });

// Unicode → WinAnsi bajt (s foldanjem znakova kojih nema u WinAnsi).
const MAP = {
  "š": 0x9a, "Š": 0x8a, "ž": 0x9e, "Ž": 0x8e,
  "č": 0x63, "Č": 0x43, "ć": 0x63, "Ć": 0x43, "đ": 0x64, "Đ": 0x44,
  "—": 0x97, "–": 0x96, "„": 0x84, "”": 0x94, "“": 0x93, "…": 0x85,
};

/** Pretvori string u WinAnsi bajtove + escape (, ), \ za PDF literal string. */
function encodeText(str) {
  const out = [];
  for (const ch of str) {
    let code = MAP[ch] !== undefined ? MAP[ch] : ch.charCodeAt(0);
    if (code > 0xff) code = 0x3f; // '?' fallback
    if (code === 0x28 || code === 0x29 || code === 0x5c) out.push(0x5c);
    out.push(code);
  }
  return Buffer.from(out);
}

/** Sastavi content stream: naslov (Helvetica-Bold 20) + tijelo (Helvetica 11). */
function contentStream(title, lines) {
  const parts = [];
  parts.push(Buffer.from("BT\n/F2 20 Tf\n72 780 Td\n("));
  parts.push(encodeText(title));
  parts.push(Buffer.from(") Tj\n/F1 11 Tf\n"));
  let first = true;
  for (const line of lines) {
    parts.push(Buffer.from(first ? "0 -34 Td\n(" : "0 -16 Td\n("));
    parts.push(encodeText(line));
    parts.push(Buffer.from(") Tj\n"));
    first = false;
  }
  parts.push(Buffer.from("ET\n"));
  return Buffer.concat(parts);
}

function buildPdf(title, lines) {
  const content = contentStream(title, lines);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    null, // 5 = contents stream (binary)
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];

  const chunks = [];
  const offsets = [];
  let pos = 0;
  const push = (buf) => { chunks.push(buf); pos += buf.length; };

  push(Buffer.from("%PDF-1.4\n"));
  for (let i = 0; i < objects.length; i++) {
    offsets[i] = pos;
    const num = i + 1;
    if (i === 4) {
      push(Buffer.from(`${num} 0 obj\n<< /Length ${content.length} >>\nstream\n`));
      push(content);
      push(Buffer.from("\nendstream\nendobj\n"));
    } else {
      push(Buffer.from(`${num} 0 obj\n${objects[i]}\nendobj\n`));
    }
  }

  const xrefPos = pos;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 0; i < objects.length; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  push(Buffer.from(xref));
  push(Buffer.from(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`));

  return Buffer.concat(chunks);
}

const DOCS = [
  { slug: "potvrda-o-prebivalistu", title: "POTVRDA O PREBIVALIŠTU", lines: [
    "Ministarstvo unutarnjih poslova", "Klasa: 224-01/26-01/1234", "",
    "Ovime se potvrđuje prijavljeno prebivalište na adresi navedenoj",
    "u sustavu e-Građani.", "", "Datum izdavanja: 22. svibnja 2026.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "domovnica", title: "DOMOVNICA", lines: [
    "Republika Hrvatska — Izvadak iz knjige državljana", "",
    "Elektronički zapis o hrvatskom državljanstvu izdan putem",
    "sustava e-Građani.", "", "Datum izdavanja: 9. travnja 2026.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "porezno-rjesenje-2025", title: "POREZNO RJEŠENJE ZA 2025.", lines: [
    "Porezna uprava — Godišnji obračun poreza na dohodak", "",
    "Na temelju godišnjeg obračuna utvrđen je povrat poreza.",
    "Detalji su navedeni u rješenju.", "", "Datum izdavanja: 31. ožujka 2026.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "potvrda-o-studiranju", title: "POTVRDA O STUDIRANJU", lines: [
    "Sveučilište u Zagrebu — Akademska godina 2025./2026.", "",
    "Potvrđuje se status redovitog studenta.",
    "Izdano putem sustava e-Građani.", "", "Datum izdavanja: 18. veljače 2026.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "prometna-dozvola", title: "PROMETNA DOZVOLA", lines: [
    "Ministarstvo unutarnjih poslova — Elektronički zapis o vozilu", "",
    "Podaci o registriranom vozilu i razdoblju važenja registracije.", "",
    "Datum izdavanja: 27. siječnja 2026.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "rodni-list", title: "RODNI LIST", lines: [
    "Matični ured — Izvadak iz matice rođenih", "",
    "Elektronički zapis o činjenici rođenja izdan putem",
    "sustava e-Građani.", "", "Datum izdavanja: 12. studenoga 2025.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "potvrda-o-nekaznjavanju", title: "POTVRDA O NEKAŽNJAVANJU", lines: [
    "Ministarstvo pravosuđa i uprave — Izvadak iz kaznene evidencije", "",
    "Potvrđuje se da osoba nije pravomoćno osuđivana.",
    "Izdano putem sustava e-Građani.", "", "Datum izdavanja: 5. rujna 2025.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
  { slug: "preslika-osobne-iskaznice", title: "PRESLIKA OSOBNE ISKAZNICE", lines: [
    "Ministarstvo unutarnjih poslova", "Digitalna preslika identifikacijske isprave", "",
    "Elektronička preslika osobne iskaznice pohranjena u sustavu",
    "e-Građani.", "", "Datum izdavanja: 19. srpnja 2025.", "",
    "(Mock dokument — sadržaj služi isključivo za demonstraciju.)" ] },
];

for (const d of DOCS) {
  const pdf = buildPdf(d.title, d.lines);
  const file = path.join(OUT, `${d.slug}.pdf`);
  fs.writeFileSync(file, pdf);
  process.stdout.write(`✓ ${d.slug}.pdf (${pdf.length} bytes)\n`);
}
process.stdout.write(`Done — ${DOCS.length} PDF-a u public/datoteke/\n`);
