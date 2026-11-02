import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/50">
          νοῦς — from the Greek
        </span>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-mono text-foreground/70">
          <Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-accent">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
}
