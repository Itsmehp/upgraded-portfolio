"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { initialPortfolioData } from "@/lib/portfolioData";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const { personal, about, projects } = initialPortfolioData;
  const featuredProjects = projects.slice(0, 3);

  // Hero animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate title characters
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { opacity: 0, y: 100, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.03 }
        );
      }

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // Animate CTA buttons
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );

      // Animate stats
      tl.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  // Projects section animation on scroll
  useGSAP(
    () => {
      if (!projectsRef.current) return;

      gsap.fromTo(
        projectsRef.current.querySelectorAll(".project-card"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ perspective: "1000px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center pt-20 pb-16"
      >
        <div className="container-custom">
          {/* Main Title */}
          <div className="mb-8">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]"
            >
              <span className="block">{splitText("Creative")}</span>
              <span className="block text-[var(--color-muted-foreground)]">
                {splitText("Developer")}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl mb-12 opacity-0"
          >
            {personal.bio}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-20">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-medium transition-all duration-300 hover:gap-4"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded-full font-medium transition-all duration-300 hover:bg-[var(--color-muted)]"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--color-border)] pt-8"
          >
            <div className="opacity-0">
              <p className="text-3xl md:text-4xl font-bold">{about.experience}</p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Experience
              </p>
            </div>
            <div className="opacity-0">
              <p className="text-3xl md:text-4xl font-bold">{about.completed}</p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Completed
              </p>
            </div>
            <div className="opacity-0">
              <p className="text-3xl md:text-4xl font-bold">
                {about.skills.length}+
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Technologies
              </p>
            </div>
            <div className="opacity-0">
              <p className="text-3xl md:text-4xl font-bold">{about.support}</p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-24 bg-[var(--color-muted)]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="text-sm font-mono text-[var(--color-muted-foreground)] mb-2">
                Featured Work
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Selected Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors mt-4 md:mt-0"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <article
                key={project.name}
                className="project-card group opacity-0"
              >
                <Link
                  href={`/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center p-6 md:p-8 bg-[var(--color-background)] rounded-2xl transition-all duration-500 hover-lift">
                    {/* Project Image Placeholder */}
                    <div className="aspect-project bg-[var(--color-muted)] rounded-xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-muted-foreground)]">
                        <span className="text-6xl font-bold opacity-20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="space-y-4">
                      <span className="inline-block px-3 py-1 text-xs font-mono bg-[var(--color-muted)] rounded-full">
                        {project.category || "Project"}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-[var(--color-muted-foreground)] line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-[var(--color-muted)] rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium pt-4 group-hover:gap-4 transition-all">
                        View Project
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-[var(--color-muted-foreground)] mb-2">
              What I Do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {initialPortfolioData.services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-foreground)]"
              >
                <span className="text-4xl font-bold text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-2">{service.title}</h3>
                <p className="text-[var(--color-muted-foreground)] text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-foreground)] text-[var(--color-background)]">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto mb-10">
            Have a project in mind? Let&apos;s collaborate and build something
            amazing together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full font-medium text-lg transition-all duration-300 hover:gap-4 hover:scale-105"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-mono text-xl font-bold">
                HP<span className="text-[var(--color-accent)]">.</span>
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                © {new Date().getFullYear()} Harshil Patel. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              {personal.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  aria-label={social.platform}
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
