"use client";
import { useEffect } from "react";

/** Visible CSS defaults; prepare only groups still below the viewport. */
export function installReferenceReveals(root: Document = document) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Map<HTMLElement, Animation>();
  const elements = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
  const finish = (element: HTMLElement) => {
    element.dataset.revealPlayed = "true";
    animations.get(element)?.cancel();
    animations.delete(element);
  };
  const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      observer?.unobserve(element);
      element.dataset.revealPlayed = "true";
      if (reduced.matches || document.visibilityState === "hidden" || entry.boundingClientRect.bottom <= 0) finish(element);
      else animations.get(element)?.play();
    }
  }, { threshold: 0, rootMargin: "0px 0px 96px 0px" }) : undefined;
  const stop = () => { observer?.disconnect(); elements.forEach(finish); };
  const onPreference = () => { if (reduced.matches) stop(); };
  reduced.addEventListener("change", onPreference);
  for (const element of elements) {
    if (element.dataset.revealPlayed === "true") continue;
    const rect = element.getBoundingClientRect();
    if (reduced.matches || !observer || !element.animate || rect.top < innerHeight || document.visibilityState === "hidden") { finish(element); continue; }
    const transform = element.dataset.reveal === "media" ? "scale(1.025)" : element.dataset.reveal === "slide" ? "translateX(-12px)" : element.dataset.reveal === "fade" ? "none" : "translateY(8px)";
    const animation = element.animate([{ opacity: 0, transform }, { opacity: 1, transform: "none" }], { duration: 600, delay: Number(element.dataset.delay || 0), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
    animation.pause();
    animation.onfinish = () => finish(element);
    animations.set(element, animation);
    observer.observe(element);
  }
  return () => { stop(); reduced.removeEventListener("change", onPreference); };
}
export function PageEffects() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const owned: Animation[] = [];
    // Transform-only after mounting: never hide an already painted hero.
    if (!reduced.matches && scrollY < 40) {
      document.querySelectorAll<HTMLElement>("[data-hero], [data-hero-media]").forEach((element, index) => {
        const animation = element.animate([{ transform: `translateY(${element.hasAttribute("data-hero-media") ? 8 : 16}px)` }, { transform: "none" }], { duration: 700, delay: Math.min(index * 80, 240), easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
        owned.push(animation);
      });
    }
    const stopHero = () => { if (reduced.matches) owned.forEach(animation => animation.cancel()); };
    reduced.addEventListener("change", stopHero);
    const cleanReveals = installReferenceReveals();
    const focusHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
    };
    window.addEventListener("hashchange", focusHash);
    return () => { cleanReveals(); owned.forEach(animation => animation.cancel()); reduced.removeEventListener("change", stopHero); window.removeEventListener("hashchange", focusHash); };
  }, []);
  return null;
}
