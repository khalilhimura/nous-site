"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between px-6 pt-24 pb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[60%] aspect-square rounded-full bg-accent/3 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] aspect-square rounded-full bg-accent/2 blur-[100px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full">
        {/* Greek script */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block font-serif text-[13vw] sm:text-[11vw] md:text-[10vw] leading-[0.85] tracking-tighter text-foreground select-none">
            νοῦς
          </span>
        </motion.div>

        {/* Transliteration and short definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 max-w-[42rem]"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
            <span className="font-mono text-sm text-muted italic">
              nous
            </span>
            <span className="font-mono text-xs text-muted/50">
              /nuːs/
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted/50">
              Noun
            </span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-[65ch]">
            The ancient Greek word for mind, intellect, and the faculty of
            intuitive insight — the part of consciousness that grasps truth
            directly, without the labor of step-by-step reason.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-muted/40"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
            Explore the entries
          </span>
        </motion.div>
      </div>
    </section>
  );
}
