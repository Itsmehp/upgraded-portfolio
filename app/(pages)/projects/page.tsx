"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink, Github, Filter } from "lucide-react";
import { initialPortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Applications", "Web"];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");

  const { projects } = initialPortfolioData;

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Hero animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroRef.current?.querySelectorAll(".hero-animate") || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
      );
    },
    { scope: containerRef }
  );

  // Projects grid animation
  useGSAP(
    () => {
      if (!projectsGridRef.current) return;

      gsap.fromTo(
        projectsGridRef.current.querySelectorAll(".project-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  // Handle category change with animation
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    // Animate out current projects
    gsap.to(projectsGridRef.current?.querySelectorAll(".project-card") || [], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(category);
        // Animate in new projects after state update
        requestAnimationFrame(() => {
          gsap.fromTo(
            projectsGridRef.current?.querySelectorAll(".project-card") || [],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
          );
        });
      },
    });
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div ref={containerRef} className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="hero-animate text-sm font-mono text-[var(--color-muted-foreground)] mb-4 opacity-0">
              My Work
            </p>
            <h1 className="hero-animate text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 opacity-0">
              Projects that showcase my{" "}
              <span className="text-[var(--color-muted-foreground)]">
                skills
              </span>{" "}
              and{" "}
              <span className="text-[var(--color-muted-foreground)]">
                creativity
              </span>
            </h1>
            <p className="hero-animate text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl opacity-0">
              A collection of projects I&apos;ve worked on, ranging from web
              applications to business websites. Each project represents a
              unique challenge and learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-5 h-5 text-[var(--color-muted-foreground)]" />
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                      : "bg-[var(--color-muted)] hover:bg-[var(--color-border)]"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <span className="text-sm text-[var(--color-muted-foreground)] ml-auto">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container-custom">
          <div
            ref={projectsGridRef}
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <article
                key={project.name}
                className="project-card group opacity-0"
              >
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
                        href={`/projects/${generateSlug(project.name)}`}
                        className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-foreground)] hover:scale-110 transition-transform"
                        aria-label="View project details"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-[var(--color-background)] rounded-full text-[var(--color-foreground)] hover:scale-110 transition-transform"
                          aria-label="View live site"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
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
                        {project.category || "Project"}
                      </span>
                    </div>
                    <Link href={`/projects/${generateSlug(project.name)}`}>
                      <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {project.name}
                      </h2>
                    </Link>
                    <p className="text-[var(--color-muted-foreground)] text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-foreground)] text-[var(--color-background)]">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto mb-10">
            I&apos;m always excited to work on new and challenging projects.
            Let&apos;s create something amazing together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full font-medium text-lg transition-all duration-300 hover:gap-4 hover:scale-105"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
