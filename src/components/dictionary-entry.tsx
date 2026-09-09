"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface EntryProps {
  headword: string;
  transliteration: string;
  phonetic?: string;
  partOfSpeech: string;
  definition: string;
  etymology: string;
  usageNote?: string;
  relatedTerms?: { term: string; definition: string }[];
  index: number;
}

export function DictionaryEntry({
  headword,
  transliteration,
  phonetic,
  partOfSpeech,
  definition,
  etymology,
  usageNote,
  relatedTerms,
  index,
}: EntryProps) {
  return (
    <section className="py-24 md:py-32 border-t border-border first:border-t-0">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1400px] mx-auto px-6"
      >
        {/* Entry number */}
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          Entry {String(index + 1).padStart(2, "0")}
        </span>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column — headword */}
          <div className="lg:col-span-5">
            <h2 className="font-sans text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none text-foreground">
              {headword}
            </h2>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-sm text-muted italic">
                {transliteration}
              </span>
              {phonetic && (
                <span className="font-mono text-xs text-muted/60">
                  /{phonetic}/
                </span>
              )}
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted/60">
                {partOfSpeech}
              </span>
            </div>
          </div>

          {/* Right column — definition body */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/85 max-w-[65ch]">
              {definition}
            </p>

            {/* Etymology */}
            <div className="mt-10 pt-8 border-t border-border">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                Etymology
              </span>
              <p className="mt-3 text-base leading-relaxed text-foreground/70 max-w-[65ch]">
                {etymology}
              </p>
            </div>

            {/* Usage note */}
            {usageNote && (
              <div className="mt-10 pt-8 border-t border-border">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  Usage
                </span>
                <p className="mt-3 text-base leading-relaxed text-foreground/70 max-w-[65ch] italic">
                  {usageNote}
                </p>
              </div>
            )}

            {/* Related terms */}
            {relatedTerms && relatedTerms.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  Related Forms
                </span>
                <div className="mt-3 space-y-3">
                  {relatedTerms.map((rt) => (
                    <div key={rt.term} className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-accent font-medium">
                        {rt.term}
                      </span>
                      <span className="text-sm text-foreground/60">
                        {rt.definition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
