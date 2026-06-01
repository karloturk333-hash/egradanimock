interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = "20px", className = "" }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width,
        height,
        borderRadius: "var(--radius-md)",
        background:
          "linear-gradient(90deg, var(--color-surface-3) 25%, var(--color-surface-2) 50%, var(--color-surface-3) 75%)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.4s ease infinite",
      }}
    />
  );
}
