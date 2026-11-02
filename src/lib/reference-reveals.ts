/** Leaf-only, once-per-mount reveals. CSS always defaults to readable content. */
export function installReferenceReveals(root: ParentNode = document) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Map<HTMLElement, Animation>();
  const elements = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
  const finish = (element: HTMLElement) => {
    element.dataset.revealPlayed = 'true';
    animations.get(element)?.cancel();
    animations.delete(element);
  };
  const observer = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          element.dataset.revealPlayed = 'true';
          if (reduced.matches || document.visibilityState === 'hidden' || entry.boundingClientRect.bottom <= 0) finish(element);
          else animations.get(element)?.play();
        }
      }, { threshold: 0, rootMargin: '0px 0px 96px 0px' })
    : undefined;
  const stop = () => {
    observer?.disconnect();
    elements.forEach(finish);
  };
  const onPreference = () => { if (reduced.matches) stop(); };
  reduced.addEventListener('change', onPreference);
  for (const element of elements) {
    if (element.dataset.revealPlayed === 'true') continue;
    const rect = element.getBoundingClientRect();
    if (reduced.matches || !observer || !element.animate || rect.top < innerHeight || document.visibilityState === 'hidden') {
      finish(element); continue;
    }
    const transform = element.dataset.reveal === 'slide' ? 'translateX(12px)' : 'translateY(8px)';
    const animation = element.animate([{ opacity: 0, transform }, { opacity: 1, transform: 'none' }], {
      duration: element.dataset.reveal === 'slide' ? 550 : 500,
      delay: Math.min(Number(element.dataset.stagger || 0), 210),
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', fill: 'backwards',
    });
    animation.pause();
    animation.onfinish = () => finish(element);
    animations.set(element, animation);
    observer.observe(element);
  }
  return () => { stop(); reduced.removeEventListener('change', onPreference); };
}
