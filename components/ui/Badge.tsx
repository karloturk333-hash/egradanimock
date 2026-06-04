export type BadgeTone = "success" | "warning" | "error" | "info" | "neutral";

const TONE_STYLES: Record<BadgeTone, { color: string; bg: string }> = {
  success: { color: "var(--color-success)", bg: "var(--color-success-bg)" },
  warning: { color: "var(--color-warning)", bg: "var(--color-warning-bg)" },
  error: { color: "var(--color-error)", bg: "var(--color-error-bg)" },
  info: { color: "var(--color-info)", bg: "var(--color-info-bg)" },
  neutral: { color: "var(--color-text-muted)", bg: "var(--color-surface-2)" },
};

interface BadgeProps {
  tone: BadgeTone;
  label: string;
}

/** Soft-fill „pill" status indikator (potpuno zaobljen). */
export function Badge({ tone, label }: BadgeProps) {
  const { color, bg } = TONE_STYLES[tone];
  return (
    <span
      style={{
        color,
        background: bg,
        fontSize: "var(--text-sm)",
        fontWeight: 600,
        letterSpacing: "0.03em",
        padding: "4px 12px",
        borderRadius: "var(--radius-pill)",
        display: "inline-block",
        whiteSpace: "nowrap",
        lineHeight: 1.2,
      }}
    >
      {label}
    </span>
  );
}
