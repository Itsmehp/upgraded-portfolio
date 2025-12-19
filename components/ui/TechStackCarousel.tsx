"use client";

import { LogoLoop, type LogoItem } from "@/components/LogoLoop";

// Tech stack logos using SVG icons from simpleicons.org CDN
export const techStackLogos: LogoItem[] = [
  {
    src: "https://cdn.simpleicons.org/vercel/white",
    alt: "Vercel",
    title: "Vercel",
    href: "https://vercel.com",
  },
  {
    src: "https://cdn.simpleicons.org/nextdotjs/white",
    alt: "Next.js",
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    src: "https://cdn.simpleicons.org/react/61DAFB",
    alt: "React",
    title: "React",
    href: "https://react.dev",
  },
  {
    src: "https://cdn.simpleicons.org/typescript/3178C6",
    alt: "TypeScript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    src: "https://cdn.simpleicons.org/n8n/EA4B71",
    alt: "n8n",
    title: "n8n",
    href: "https://n8n.io",
  },
  {
    src: "https://cdn.simpleicons.org/javascript/F7DF1E",
    alt: "JavaScript",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    src: "https://cdn.simpleicons.org/docker/2496ED",
    alt: "Docker",
    title: "Docker",
    href: "https://www.docker.com",
  },
  {
    src: "https://cdn.simpleicons.org/express/white",
    alt: "Express",
    title: "Express",
    href: "https://expressjs.com",
  },
  {
    src: "https://cdn.simpleicons.org/nodedotjs/339933",
    alt: "Node.js",
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    src: "https://cdn.simpleicons.org/supabase/3FCF8E",
    alt: "Supabase",
    title: "Supabase",
    href: "https://supabase.com",
  },
  {
    src: "https://cdn.simpleicons.org/prisma/white",
    alt: "Prisma",
    title: "Prisma",
    href: "https://www.prisma.io",
  },
  {
    src: "https://cdn.simpleicons.org/postgresql/4169E1",
    alt: "PostgreSQL",
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    src: "https://cdn.simpleicons.org/github/white",
    alt: "GitHub",
    title: "GitHub",
    href: "https://github.com",
  },
  {
    src: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    alt: "Tailwind CSS",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

interface TechStackCarouselProps {
  className?: string;
}

export function TechStackCarousel({ className }: TechStackCarouselProps) {
  return (
    <div className={className}>
      <LogoLoop
        logos={techStackLogos}
        speed={60}
        direction="left"
        logoHeight={32}
        gap={48}
        pauseOnHover
        fadeOut
        scaleOnHover
        ariaLabel="Technologies I work with"
        className="py-4"
      />
    </div>
  );
}

export default TechStackCarousel;
