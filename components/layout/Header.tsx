"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X, Sun, Moon, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/Itsmehp", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/harshil-patel-027715211/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/ItsHpLOL", icon: Twitter, label: "Twitter" },
  { href: "https://www.instagram.com/hey.its.hp/", icon: Instagram, label: "Instagram" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const socialItemsRef = useRef<HTMLAnchorElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // GSAP animations
  useGSAP(
    () => {
      if (!overlayRef.current) return;

      // Create the timeline for menu animations
      const tl = gsap.timeline({ paused: true });

      tl.to(overlayRef.current, {
        clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
        duration: 0.8,
        ease: "power4.inOut",
      })
        .fromTo(
          menuItemsRef.current,
          {
            opacity: 0,
            y: 40,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          socialItemsRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      timelineRef.current = tl;

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  // Play/reverse animation based on isOpen state
  useGSAP(
    () => {
      if (!timelineRef.current) return;

      if (isOpen) {
        document.body.style.overflow = "hidden";
        timelineRef.current.play();
      } else {
        document.body.style.overflow = "";
        timelineRef.current.reverse();
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div ref={containerRef}>
      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20">
        <div className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 text-xl font-semibold tracking-tight transition-colors duration-300"
            style={{ color: isOpen ? "white" : "var(--color-foreground)" }}
          >
            <span className="font-mono">HP</span>
            <span className="text-[var(--color-accent)]">.</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className={cn(
                  "relative z-50 p-2 rounded-full transition-all duration-300 hover:scale-110",
                  isOpen ? "text-white" : "text-[var(--color-foreground)]"
                )}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            {/* Menu Toggle */}
            <button
              onClick={toggleMenu}
              className={cn(
                "relative z-50 p-2 rounded-full transition-all duration-300 hover:scale-110",
                isOpen ? "text-white" : "text-[var(--color-foreground)]"
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-neutral-900 dark:bg-neutral-950"
        style={{
          clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="h-full flex flex-col justify-center container-custom">
          {/* Navigation Links */}
          <nav className="mb-16" aria-label="Main navigation">
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    ref={(el) => {
                      if (el) menuItemsRef.current[index] = el;
                    }}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-5xl md:text-7xl lg:text-8xl font-bold text-white transition-all duration-300 hover:translate-x-4",
                      "opacity-0", // Initial state for GSAP
                      pathname === link.href && "text-[var(--color-accent)]"
                    )}
                    style={{ perspective: "1000px" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={social.href}
                ref={(el) => {
                  if (el) socialItemsRef.current[index] = el;
                }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 opacity-0"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-white/50 text-sm">
            <p>harshil.hpz@gmail.com</p>
            <p className="mt-1">Germany</p>
          </div>
        </div>
      </div>
    </div>
  );
}
