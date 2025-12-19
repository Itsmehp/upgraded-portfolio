import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Harshil Patel | Web Developer",
    template: "%s | Harshil Patel",
  },
  description:
    "Full-stack web developer based in Germany, specializing in React, JavaScript, and modern web development. Currently pursuing Masters in AI and Robotics.",
  keywords: [
    "Web Developer",
    "React Developer",
    "Full Stack Developer",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Harshil Patel" }],
  creator: "Harshil Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshil07.in",
    siteName: "Harshil Patel Portfolio",
    title: "Harshil Patel | Web Developer",
    description:
      "Full-stack web developer based in Germany, specializing in React, JavaScript, and modern web development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshil Patel | Web Developer",
    description:
      "Full-stack web developer based in Germany, specializing in React, JavaScript, and modern web development.",
    creator: "@ItsHpLOL",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Schema for SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harshil Patel",
  url: "https://harshil07.in",
  jobTitle: "Web Developer",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Hochschule Hof",
    },
    {
      "@type": "EducationalOrganization",
      name: "Parul Institute of Technology",
    },
  ],
  sameAs: [
    "https://github.com/Itsmehp",
    "https://www.linkedin.com/in/harshil-patel-027715211/",
    "https://twitter.com/ItsHpLOL",
    "https://www.instagram.com/hey.its.hp/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
