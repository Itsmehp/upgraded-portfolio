"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { initialPortfolioData } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
};

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const { personal } = initialPortfolioData;

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });

      // Animate success message
      gsap.fromTo(
        ".success-message",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="hero-animate text-sm font-mono text-[var(--color-muted-foreground)] mb-4 opacity-0">
              Get in Touch
            </p>
            <h1 className="hero-animate text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 opacity-0">
              Let&apos;s start a{" "}
              <span className="text-[var(--color-muted-foreground)]">
                conversation
              </span>
            </h1>
            <p className="hero-animate text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl opacity-0">
              Have a project in mind or just want to say hello? I&apos;d love to
              hear from you. Fill out the form below or reach out through any of
              my social channels.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Contact Info</h2>

                <div className="space-y-4">
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-start gap-4 p-4 bg-[var(--color-muted)] rounded-xl transition-all duration-300 hover:bg-[var(--color-border)]"
                  >
                    <div className="p-2 bg-[var(--color-background)] rounded-lg">
                      <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        Email
                      </p>
                      <p className="font-medium">{personal.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-[var(--color-muted)] rounded-xl">
                    <div className="p-2 bg-[var(--color-background)] rounded-lg">
                      <Phone className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        Phone
                      </p>
                      <p className="font-medium">{personal.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-[var(--color-muted)] rounded-xl">
                    <div className="p-2 bg-[var(--color-background)] rounded-lg">
                      <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        Location
                      </p>
                      <p className="font-medium">{personal.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Connect with me</h3>
                <div className="flex gap-3">
                  {personal.socialLinks.map((social) => {
                    const Icon = socialIcons[social.platform] || ArrowUpRight;
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[var(--color-muted)] rounded-xl transition-all duration-300 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
                        aria-label={social.platform}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="p-6 border border-[var(--color-border)] rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  I&apos;m currently open to freelance projects and full-time
                  opportunities. Let&apos;s discuss how I can help with your next
                  project.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--color-muted)] rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                {submitStatus === "success" ? (
                  <div className="success-message text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-[var(--color-muted-foreground)] mb-6">
                      Thank you for reaching out. I&apos;ll get back to you as soon
                      as possible.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="px-6 py-2 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-medium transition-all duration-300 hover:scale-105"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-xl font-medium text-lg transition-all duration-300",
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:gap-4 hover:scale-[1.02]"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-[var(--color-background)] border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[var(--color-muted)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-[var(--color-muted-foreground)] mb-2">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What services do you offer?",
                a: "I specialize in web development, UI/UX design, and React/Next.js applications. I can help with anything from landing pages to full-scale web applications.",
              },
              {
                q: "What is your typical project timeline?",
                a: "Project timelines vary based on complexity. A simple website might take 1-2 weeks, while a complex application could take 1-3 months. I'll provide a detailed timeline after understanding your requirements.",
              },
              {
                q: "Do you work with clients internationally?",
                a: "Yes! I work with clients from all over the world. I'm based in Germany but am flexible with communication across different time zones.",
              },
              {
                q: "What is your pricing structure?",
                a: "I offer both project-based and hourly pricing depending on the scope of work. Let's discuss your project, and I'll provide a tailored quote.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-[var(--color-background)] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-medium list-none">
                  {faq.q}
                  <span className="text-2xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[var(--color-muted-foreground)]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
