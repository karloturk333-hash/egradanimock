"use client";

import { useEffect, useState } from "react";
import { MessageListItem } from "@/components/messages/MessageListItem";
import { MessageDetail } from "@/components/messages/MessageDetail";
import { InboxEmptyState } from "@/components/messages/InboxEmptyState";
import type { Message } from "@/lib/types";

// Split (lista + detalj) tek od 1024px. Ispod toga (uklj. tablet 768–1024 sa sidebarom)
// je list-only prikaz koji navigira na /poruke/[id] — inače detalj nema dovoljno širine.
const SPLIT_QUERY = "(min-width: 1024px)";

interface InboxViewProps {
  messages: Message[];
}

export function InboxView({ messages }: InboxViewProps) {
  const [isSplit, setIsSplit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(SPLIT_QUERY);
    const update = () => setIsSplit(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (messages.length === 0) {
    return <InboxEmptyState />;
  }

  // U split prikazu uvijek imamo odabranu poruku (prva ako ništa nije odabrano).
  // Izvedeno tijekom rendera — bez setState u efektu (izbjegava kaskadne rendere).
  const effectiveSelectedId =
    isSplit && selectedId === null ? messages[0].id : selectedId;

  function handleSelect(e: React.MouseEvent<HTMLAnchorElement>, message: Message) {
    // Split: presretni navigaciju i prikaži detalj u stupcu.
    // Modifier klik (cmd/ctrl/shift/alt) pušta nativni <a> → otvori u novoj kartici.
    if (isSplit && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      setSelectedId(message.id);
    }
    // List-only (mobilni/tablet): ne diramo — <a href="/poruke/[id]"> navigira nativno.
  }

  const selected = messages.find((m) => m.id === effectiveSelectedId) ?? null;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--gutter)" }}>
      <ul
        aria-label="Popis poruka"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          width: "100%",
          flex: isSplit ? "0 0 420px" : undefined,
          maxWidth: isSplit ? "420px" : undefined,
        }}
      >
        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            isActive={isSplit && message.id === effectiveSelectedId}
            onSelect={(e) => handleSelect(e, message)}
          />
        ))}
      </ul>

      {isSplit && selected && (
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "sticky",
            top: "calc(var(--header-height) + var(--space-lg))",
            height: "calc(100vh - var(--header-height) - 2 * var(--space-lg))",
          }}
        >
          <MessageDetail message={selected} />
        </div>
      )}
    </div>
  );
}
