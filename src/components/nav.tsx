"use client";

export function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 mix-blend-difference pointer-events-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-16 pointer-events-auto">
        <span className="text-sm font-medium text-white/80 tracking-tight">
          νοῦς
        </span>
        <span className="text-xs font-mono text-white/50 tracking-wide uppercase">
          Ancient Greek
        </span>
      </div>
    </nav>
  );
}
