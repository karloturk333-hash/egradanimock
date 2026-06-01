interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Unutarnji razmak. Postaviti na 0 kad redci nose vlastiti padding. */
  padding?: number | string;
  /** Sakrij prelijevanje (za liste s obrubima među redcima). */
  clip?: boolean;
  style?: React.CSSProperties;
}

export function Card({
  children,
  className = "",
  padding = "var(--space-md)",
  clip = false,
  style,
}: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
        padding: typeof padding === "number" ? `${padding}px` : padding,
        overflow: clip ? "hidden" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
