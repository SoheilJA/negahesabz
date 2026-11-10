/**
 * Micro-interactions — anime.js v4 (scope-less DOM animations).
 * Small UI flourishes only; GSAP handles the big sequences.
 */
import { animate } from 'animejs';
import { prefersReducedMotion } from './motion.js';

/** Number counter shimmer for stat suffix (+) */
export function pulseIn(el) {
  if (prefersReducedMotion() || !el) return;
  animate(el, {
    opacity: [0, 1],
    translateY: [8, 0],
    duration: 600,
    ease: 'out(3)',
  });
}

/** Toast slide-in. */
export function toastIn(card) {
  animate(card, {
    opacity: [0, 1],
    translateY: [14, 0],
    duration: 420,
    ease: 'out(3)',
  });
}

/** Toast slide-out. */
export function toastOut(card) {
  return animate(card, {
    opacity: [1, 0],
    translateY: [0, 10],
    duration: 320,
    ease: 'in(3)',
  }).finished;
}

/** Row underline sweep when a list item enters view. */
export function sweepBorder(el) {
  if (prefersReducedMotion() || !el) return;
  el.style.backgroundSize = '0% 1px';
  animate(el, { backgroundSize: ['0% 1px', '100% 1px'], duration: 900, ease: 'out(3)' });
}

/** Magnetic pull for primary CTAs (desktop, fine pointer only). */
export function magnetic(el, { strength = 14 } = {}) {
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return () => {};
  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.translate = `${dx * strength}px ${dy * strength}px`;
  };
  const reset = () => {
    el.style.translate = '0px 0px';
    el.style.transition = 'translate 0.4s cubic-bezier(0.22,1,0.36,1)';
    setTimeout(() => (el.style.transition = ''), 420);
  };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', reset);
  };
}
