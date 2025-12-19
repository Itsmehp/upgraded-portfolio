import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { initialPortfolioData } from "@/lib/portfolioData";

// Generate static params for all projects
export async function generateStaticParams() {
  return initialPortfolioData.projects.map((project) => ({
    slug: project.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

// Generate metadata for each project page
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const project = initialPortfolioData.projects.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | Harshil Patel`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { projects } = initialPortfolioData;

  const project = projects.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!project) {
    notFound();
  }

  // Get related projects (same category, excluding current)
  const relatedProjects = projects
    .filter(
      (p) =>
        p.name !== project.name &&
        (p.category === project.category ||
          p.technologies.some((t) => project.technologies.includes(t)))
    )
    .slice(0, 3);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 border-b border-[var(--color-border)]">
        <div className="container-custom">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-muted-foreground)] mb-4">
                <Tag className="w-4 h-4" />
                {project.category || "Project"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {project.name}
              </h1>
              <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-medium transition-all duration-300 hover:gap-4"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-border)] rounded-full font-medium transition-all duration-300 hover:bg-[var(--color-muted)]"
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image/Preview */}
      <section className="py-16">
        <div className="container-custom">
          <div className="aspect-video bg-[var(--color-muted)] rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl font-bold text-[var(--color-muted-foreground)] opacity-10">
                {project.name.charAt(0)}
              </span>
            </div>
            {/* If you have project images, add them here */}
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">About the Project</h2>
              <div className="prose prose-lg max-w-none text-[var(--color-muted-foreground)]">
                <p>{project.description}</p>
                <p>
                  This project was built using modern web technologies and best
                  practices. It showcases my skills in frontend development,
                  responsive design, and creating intuitive user experiences.
                </p>
                <h3 className="text-xl font-bold text-[var(--color-foreground)] mt-8 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-1.5">•</span>
                    Responsive design that works on all devices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-1.5">•</span>
                    Clean and intuitive user interface
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-1.5">•</span>
                    Optimized performance and fast loading times
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-1.5">•</span>
                    Modern development practices and clean code
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              <div className="p-6 bg-[var(--color-muted)] rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[var(--color-background)] rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="p-6 border border-[var(--color-border)] rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                    >
                      <span className="font-medium">Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                    >
                      <span className="font-medium">Source Code</span>
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-[var(--color-muted)]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Related Projects</h2>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
              >
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <Link
                  key={relatedProject.name}
                  href={`/projects/${generateSlug(relatedProject.name)}`}
                  className="group"
                >
                  <article className="bg-[var(--color-background)] rounded-2xl overflow-hidden transition-all duration-300 hover-lift">
                    <div className="aspect-video bg-[var(--color-border)] relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-[var(--color-muted-foreground)] opacity-20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-mono text-[var(--color-muted-foreground)]">
                        {relatedProject.category || "Project"}
                      </span>
                      <h3 className="text-lg font-bold mt-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {relatedProject.name}
                      </h3>
                      <p className="text-sm text-[var(--color-muted-foreground)] mt-2 line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[var(--color-foreground)] text-[var(--color-background)]">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested in similar work?
          </h2>
          <p className="text-lg opacity-70 max-w-xl mx-auto mb-10">
            Let&apos;s discuss how I can help bring your ideas to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] rounded-full font-medium text-lg transition-all duration-300 hover:gap-4 hover:scale-105"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
