import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level: string;
  className?: string;
}

export function SkillBadge({ name, level, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        level === "Advanced" &&
          "bg-[var(--color-foreground)] text-[var(--color-background)]",
        level === "Intermediate" &&
          "bg-[var(--color-muted)] border border-[var(--color-border)]",
        level === "Basic" &&
          "bg-transparent border border-[var(--color-border)] text-[var(--color-muted-foreground)]",
        className
      )}
    >
      {name}
      <span className="ml-2 text-xs opacity-60">{level}</span>
    </span>
  );
}
