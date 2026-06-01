interface SpinnerProps {
  size?: number;
  label?: string;
}

export function Spinner({ size = 24, label = "Učitavanje..." }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} style={{ display: "inline-flex" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ animation: "spin 0.8s linear infinite" }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--color-border)"
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
