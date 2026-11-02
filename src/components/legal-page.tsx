import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

export function LegalPage({
  title,
  introduction,
  sections,
}: {
  title: string;
  introduction: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <a href="#legal-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-6 focus:z-[60] focus:bg-background focus:p-3 focus:text-foreground">
        Skip to content
      </a>
      <Nav />
      <main id="legal-content" className="mx-auto max-w-[1400px] px-6 pt-32 pb-24 md:pt-44 md:pb-32">
        <header className="max-w-3xl">
          <Link href="/" className="text-sm text-foreground/70 underline decoration-border underline-offset-4 hover:text-accent">
            ← Back to Nous
          </Link>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-foreground/60">Legal</p>
          <h1 className="mt-5 text-5xl tracking-tighter sm:text-7xl">{title}</h1>
          <p className="mt-6 font-mono text-xs text-foreground/60">
            Last updated <time dateTime="2026-11-02">2 November 2026</time>
          </p>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-foreground/80">{introduction}</p>
        </header>
        <div className="mt-16 grid gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:col-span-4">
            <nav aria-label="On this page" className="lg:sticky lg:top-24">
              <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/60">On this page</h2>
              <ol className="mt-5 space-y-3">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-sm leading-relaxed text-foreground/70 hover:text-accent">
                      <span className="mr-3 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="max-w-[65ch] lg:col-span-7 lg:col-start-6">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24 border-b border-border pb-10 mb-10 last:mb-0 last:border-0 last:pb-0">
                <h2 id={`${section.id}-heading`} className="text-2xl tracking-tight">
                  <span className="mr-3 font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-foreground/80 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
