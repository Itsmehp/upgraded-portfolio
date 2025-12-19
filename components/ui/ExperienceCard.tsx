import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  className?: string;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  achievements,
  className,
}: ExperienceCardProps) {
  return (
    <article
      className={cn(
        "group relative pl-8 pb-8 border-l-2 border-[var(--color-border)] last:pb-0",
        className
      )}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-foreground)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors" />

      <div className="bg-[var(--color-background)] rounded-2xl p-6 md:p-8 transition-all duration-300 hover-lift">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-[var(--color-muted-foreground)]">{company}</p>
          </div>
          <span className="text-sm font-mono text-[var(--color-muted-foreground)] mt-2 md:mt-0">
            {period}
          </span>
        </div>
        <p className="text-[var(--color-muted-foreground)] mb-4">
          {description}
        </p>
        <ul className="space-y-2">
          {achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-[var(--color-accent)] mt-1.5">•</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
