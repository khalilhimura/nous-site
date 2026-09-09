"use client";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/50">
          νοῦς — from the Greek
        </span>
        <span className="text-xs font-mono text-muted/40">
          A lexical meditation
        </span>
      </div>
    </footer>
  );
}
