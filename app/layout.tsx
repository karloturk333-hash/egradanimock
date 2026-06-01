import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { BottomNav } from "@/components/layout/BottomNav";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eGrađani — Korisnički portal",
  description: "Digitalni servis za građane Republike Hrvatske",
};

function greetingFor(hour: number): string {
  if (hour < 12) return "Dobro jutro";
  if (hour < 18) return "Dobar dan";
  return "Dobra večer";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const greeting = greetingFor(new Date().getHours());

  return (
    <html lang="hr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a className="eg-skip-link" href="#main-content">
          Prijeđi na sadržaj
        </a>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <TopAppBar greeting={greeting} />
            <main id="main-content" tabIndex={-1} className="eg-main">
              {children}
            </main>
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
