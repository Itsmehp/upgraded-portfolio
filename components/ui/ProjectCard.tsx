import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  technologies: string[];
  category?: string;
  links: {
    github?: string;
    live?: string;
  };
  index: number;
  className?: string;
}

export function ProjectCard({
  name,
  description,
  technologies,
  category,
  links,
  index,
  className,
}: ProjectCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <article className={cn("group", className)}>
      <div className="relative h-full bg-[var(--color-muted)] rounded-2xl overflow-hidden transition-all duration-500 hover-lift">
        {/* Project Image/Placeholder */}
        <div className="aspect-video bg-[var(--color-border)] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-[var(--color-muted-foreground)] opacity-20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[var(--color-foreground)] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-4">
            <Link
              href={`/projects/${slug}`}
              className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-foreground)] hover:scale-110 transition-transform"
              aria-label="View project details"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-foreground)] hover:scale-110 transition-transform"
                aria-label="View live site"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-foreground)] hover:scale-110 transition-transform"
                aria-label="View source code"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-mono px-2 py-1 bg-[var(--color-background)] rounded-full text-[var(--color-muted-foreground)]">
              {category || "Project"}
            </span>
          </div>
          <Link href={`/projects/${slug}`}>
            <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
              {name}
            </h2>
          </Link>
          <p className="text-[var(--color-muted-foreground)] text-sm line-clamp-2 mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-[var(--color-background)] rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
