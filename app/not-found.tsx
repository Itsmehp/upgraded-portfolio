"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-custom text-center">
        <h1 className="text-9xl font-bold text-[var(--color-muted)]">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-[var(--color-muted-foreground)] max-w-md mx-auto mb-10">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-medium transition-all duration-300 hover:gap-4"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded-full font-medium transition-all duration-300 hover:bg-[var(--color-muted)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
