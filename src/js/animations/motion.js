/**
 * Motion system — Lenis smooth scroll + GSAP ScrollTrigger,
 * declarative reveal animations, parallax, and cleanup on route change.
 * Respects prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
let scrollListeners = [];
const pageCleanups = [];

/* ------------------------- Lenis ------------------------- */

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.002 ** Math.pow(2, 10 * t) - 0.001), // luxe ease
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  pageCleanups.push(() => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  });
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToEl(el, offset = 90) {
  if (lenis) lenis.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Observe scroll position (header state) — managed listener. */
export function onScroll(fn) {
  const handler = () => fn(window.scrollY);
  window.addEventListener('scroll', handler, { passive: true });
  scrollListeners.push(handler);
  handler();
}

/* ------------------------- Reveals ------------------------- */

/** Activate reveal animations for the current page. */
export function initReveals(scope = document) {
  if (prefersReducedMotion()) {
    document.documentElement.classList.remove('ns-anim');
    return;
  }
  document.documentElement.classList.add('ns-anim');
  const els = scope.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  els.forEach((el) => {
    const type = el.getAttribute('data-reveal') || 'fade-up';
    const delay = parseFloat(el.getAttribute('data-delay') || '0');

    if (type === 'clip') {
      gsap.fromTo(
        el,
        { clipPath: 'inset(12% 8% 12% 8%)', opacity: 1 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.out',
          delay,
          scrollTrigger: { trigger: el, start: 'top 82%' },
          onComplete: () => el.removeAttribute('data-reveal'),
        }
      );
      return;
    }

    // Explicit from/to pairs — the CSS pre-hide must not poison the end value.
    const from = { opacity: 0, duration: 0.9, ease: 'power3.out', delay };
    const to = { opacity: 1, clearProps: 'opacity,transform', onComplete: () => el.removeAttribute('data-reveal') };
    if (type === 'fade-up') { from.y = 34; to.y = 0; }
    else if (type === 'fade-start') { from.x = -40; to.x = 0; }
    else if (type === 'fade-end') { from.x = 40; to.x = 0; }
    else if (type === 'scale') { from.scale = 0.94; to.scale = 1; }

    gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/** Staggered group reveal (e.g. grids, lists). */
export function initStaggerReveal(scope = document) {
  if (prefersReducedMotion()) return;
  scope.querySelectorAll('[data-stagger]').forEach((group) => {
    const children = group.children;
    if (!children.length) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });
}

/* ------------------------- Parallax ------------------------- */

export function initParallax(scope = document) {
  if (prefersReducedMotion()) return;
  scope.querySelectorAll('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.getAttribute('data-parallax') || '0.12');
    gsap.to(el, {
      yPercent: -strength * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  });
}

/** Count-up animation for stat numbers. */
export function initCounters(scope = document) {
  scope.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${end}`;
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.v)}`;
      },
    });
  });
}

/* ------------------------- Section pinning (horizontal) ------------------------- */

export function initHorizontalSection(section, track) {
  if (prefersReducedMotion()) return null;
  const total = track.scrollWidth - section.clientWidth;
  if (total <= 40) return null;
  const tween = gsap.to(track, {
    x: () => (document.documentElement.dir === 'rtl' ? total : -total),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${total}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
  return tween;
}

/* ------------------------- cleanup ------------------------- */

export function cleanupPage() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  pageCleanups.splice(0).forEach((fn) => {
    try { fn(); } catch (e) { /* noop */ }
  });
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
