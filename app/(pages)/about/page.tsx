"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, GraduationCap, Code } from "lucide-react";
import { initialPortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const { personal, about, experience, education } = initialPortfolioData;

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

  // Skills section animation
  useGSAP(
    () => {
      if (!skillsRef.current) return;

      gsap.fromTo(
        skillsRef.current.querySelectorAll(".skill-item"),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Experience section animation
  useGSAP(
    () => {
      if (!experienceRef.current) return;

      gsap.fromTo(
        experienceRef.current.querySelectorAll(".experience-item"),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Education section animation
  useGSAP(
    () => {
      if (!educationRef.current) return;

      gsap.fromTo(
        educationRef.current.querySelectorAll(".education-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const frontendSkills = about.skills.filter((s) => s.category === "frontend");
  const backendSkills = about.skills.filter((s) => s.category === "backend");

  return (
    <div ref={containerRef} className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="hero-animate text-sm font-mono text-[var(--color-muted-foreground)] mb-4 opacity-0">
              About Me
            </p>
            <h1 className="hero-animate text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 opacity-0">
              I craft digital experiences that{" "}
              <span className="text-[var(--color-muted-foreground)]">
                inspire
              </span>{" "}
              and{" "}
              <span className="text-[var(--color-muted-foreground)]">
                engage
              </span>
            </h1>
            <p className="hero-animate text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl mb-8 opacity-0">
              {about.description}
            </p>
            <div className="hero-animate flex flex-wrap gap-4 opacity-0">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-medium transition-all duration-300 hover:gap-4"
              >
                View My Work
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded-full font-medium transition-all duration-300 hover:bg-[var(--color-muted)]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--color-muted)]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                {about.experience}
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-2">
                Years Experience
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">{about.completed}</p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-2">
                Projects Completed
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">
                {about.technologies.length}+
              </p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-2">
                Technologies
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">{about.support}</p>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-2">
                Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-24">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-12">
            <Code className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Frontend Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[var(--color-muted-foreground)]">
                Frontend Development
              </h3>
              <div className="flex flex-wrap gap-3">
                {frontendSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "skill-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-0",
                      skill.level === "Advanced" &&
                        "bg-[var(--color-foreground)] text-[var(--color-background)]",
                      skill.level === "Intermediate" &&
                        "bg-[var(--color-muted)] border border-[var(--color-border)]",
                      skill.level === "Basic" &&
                        "bg-transparent border border-[var(--color-border)] text-[var(--color-muted-foreground)]"
                    )}
                  >
                    {skill.name}
                    <span className="ml-2 text-xs opacity-60">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-[var(--color-muted-foreground)]">
                Backend Development
              </h3>
              <div className="flex flex-wrap gap-3">
                {backendSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      "skill-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-0",
                      skill.level === "Advanced" &&
                        "bg-[var(--color-foreground)] text-[var(--color-background)]",
                      skill.level === "Intermediate" &&
                        "bg-[var(--color-muted)] border border-[var(--color-border)]",
                      skill.level === "Basic" &&
                        "bg-transparent border border-[var(--color-border)] text-[var(--color-muted-foreground)]"
                    )}
                  >
                    {skill.name}
                    <span className="ml-2 text-xs opacity-60">
                      {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={experienceRef}
        className="py-24 bg-[var(--color-muted)]"
      >
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <article
                key={`${exp.company}-${exp.period}`}
                className="experience-item group relative pl-8 pb-8 border-l-2 border-[var(--color-border)] last:pb-0 opacity-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-foreground)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors" />

                <div className="bg-[var(--color-background)] rounded-2xl p-6 md:p-8 transition-all duration-300 hover-lift">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-[var(--color-muted-foreground)]">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-[var(--color-muted-foreground)] mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[var(--color-muted-foreground)] mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-[var(--color-accent)] mt-1">
                          •
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="py-24">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <article
                key={edu.degree}
                className="education-item p-8 border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-foreground)] opacity-0"
              >
                <span className="text-sm font-mono text-[var(--color-muted-foreground)]">
                  {edu.period}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">{edu.degree}</h3>
                <p className="text-[var(--color-muted-foreground)]">
                  {edu.institution}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-foreground)] text-[var(--color-background)]">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested in working together?
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto mb-10">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full font-medium text-lg transition-all duration-300 hover:gap-4 hover:scale-105"
          >
            Contact Me
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
