"use client";

import { useId, useState } from "react";

interface ProfilPostavkeProps {
  initial: { email: boolean; sms: boolean };
}

/** Pristupačan toggle: pravi role="switch" + aria-checked, tipkovnica, ≥44px meta. */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const labelId = useId();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "8px 0",
      }}
    >
      <span id={labelId} style={{ fontSize: "15px", color: "var(--color-text)" }}>
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        className="eg-focusable"
        style={{
          display: "inline-flex",
          alignItems: "center",
          width: "52px",
          minHeight: "44px",
          padding: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        {/* vidljiva pruga (track) */}
        <span
          aria-hidden="true"
          style={{
            position: "relative",
            width: "52px",
            height: "30px",
            borderRadius: "var(--radius-pill)",
            background: checked ? "var(--color-primary)" : "var(--color-outline)",
            transition: "background 0.15s",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "3px",
              left: checked ? "25px" : "3px",
              width: "24px",
              height: "24px",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-on-primary)",
              transition: "left 0.15s",
            }}
          />
        </span>
      </button>
    </div>
  );
}

export function ProfilPostavke({ initial }: ProfilPostavkeProps) {
  const [email, setEmail] = useState(initial.email);
  const [sms, setSms] = useState(initial.sms);
  return (
    <div>
      <Toggle label="E-mail obavijesti" checked={email} onChange={setEmail} />
      <Toggle label="SMS obavijesti" checked={sms} onChange={setSms} />
    </div>
  );
}
