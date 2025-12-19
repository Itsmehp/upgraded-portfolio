export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="flex flex-col items-center gap-4">
        {/* Animated loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[var(--color-muted)] rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-[var(--color-foreground)] rounded-full animate-spin" />
        </div>
        <p className="text-sm text-[var(--color-muted-foreground)] font-mono">
          Loading...
        </p>
      </div>
    </div>
  );
}
