"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageListItem } from "@/components/messages/MessageListItem";
import { MessageDetail } from "@/components/messages/MessageDetail";
import { InboxEmptyState } from "@/components/messages/InboxEmptyState";
import type { Message } from "@/lib/types";

const DESKTOP_QUERY = "(min-width: 768px)";

interface InboxViewProps {
  messages: Message[];
}

export function InboxView({ messages }: InboxViewProps) {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Prati širinu ekrana (mora odgovarati .eg-desktop-only / .eg-mobile-only u globals.css).
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Na desktopu uvijek imamo odabranu poruku (prva ako ništa nije odabrano).
  useEffect(() => {
    if (isDesktop && selectedId === null && messages.length > 0) {
      setSelectedId(messages[0].id);
    }
  }, [isDesktop, selectedId, messages]);

  if (messages.length === 0) {
    return <InboxEmptyState />;
  }

  function handleSelect(message: Message) {
    if (isDesktop) {
      setSelectedId(message.id);
    } else {
      router.push(`/poruke/${message.id}`);
    }
  }

  const selected = messages.find((m) => m.id === selectedId) ?? null;

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
          flex: isDesktop ? "0 0 420px" : undefined,
          maxWidth: isDesktop ? "420px" : undefined,
        }}
      >
        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            isActive={isDesktop && message.id === selectedId}
            onClick={() => handleSelect(message)}
          />
        ))}
      </ul>

      {isDesktop && selected && (
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
