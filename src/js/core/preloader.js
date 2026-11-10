/**
 * Cinematic preloader — a fine gold route drawing across a dotted world,
 * the Negah Sabz wordmark revealing, real asset progress, veil exit.
 * First load per session only; internal navigations use a light fade.
 */
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { t, getLang } from './i18n.js';
import { prefersReducedMotion } from '../animations/motion.js';

gsap.registerPlugin(MotionPathPlugin);

const SVG = `
<svg class="ns-pre-world" viewBox="0 0 560 260" fill="none" aria-hidden="true">
  <g class="ns-pre-dots"></g>
  <g class="ns-pre-dots"></g>
  <path id="ns-pre-path" class="ns-pre-route" d="M 60 196 C 130 148, 205 128, 268 150 S 386 178, 448 92 S 512 44, 540 38"/>
  <circle id="ns-pre-dot" r="3.4" fill="#B78A48" opacity="0"/>
</svg>`;

function buildDotsGroup() {
  // coarse decorative dot grid (no geo data — pure ambience)
  const rows = [0, 1];
  const groups = document.querySelectorAll('#ns-preloader .ns-pre-dots');
  let n = 0;
  groups.forEach((g, gi) => {
    let html = '';
    for (let y = 20; y <= 240; y += 22) {
      for (let x = 24; x <= 536; x += 22) {
        const band = x < 150 || x > 420 ? 0 : 1;
        if ((n + band) % 3 !== 0) { n++; continue; }
        const r = 1 + (x * y) % 3 * 0.25;
        html += `<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}"/>`;
        n++;
      }
    }
    g.innerHTML = html;
  });
}

export function initPreloader() {
  const el = document.getElementById('ns-preloader');
  if (!el) return Promise.resolve();

  // Only the first load in a session gets the full experience
  const seen = sessionStorage.getItem('ns-seen');
  if (seen || prefersReducedMotion()) {
    el.remove();
    document.getElementById('ns-boot')?.remove();
    sessionStorage.setItem('ns-seen', '1');
    return Promise.resolve();
  }

  const lang = getLang();
  const wordmark = t('brand.wordmark');
  el.classList.add('is-active');
  el.innerHTML = `
    <div class="ns-pre-inner">
      ${SVG}
      <div class="ns-pre-wordmark" aria-label="${wordmark}">${wordmark
        .split('')
        .map((c) => `<span class="wm-ch">${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('')}</div>
      <div class="ns-latin ns-pre-latin">NEGAH SABZ · ${t('preloader.intl')}</div>
      <div class="ns-pre-progress">
        <div class="ns-pre-bar"><div class="ns-pre-bar-fill"></div></div>
        <div class="ns-pre-count">00</div>
      </div>
    </div>
    <div class="ns-pre-veil is-top"></div>
    <div class="ns-pre-veil is-bottom"></div>`;
  buildDotsGroup();

  document.getElementById('ns-boot')?.remove();

  const progress = { v: 0 };
  const countEl = el.querySelector('.ns-pre-count');
  const barFill = el.querySelector('.ns-pre-bar-fill');
  const chars = el.querySelectorAll('.wm-ch');
  const path = el.querySelector('#ns-pre-path');
  const movingDot = el.querySelector('#ns-pre-dot');
  const pathLen = path.getTotalLength();

  // ---- Real asset progress: fonts + window load, min 1.4s, timeout 4s ----
  const drivers = [];
  drivers.push(
    new Promise((res) => {
      if (document.fonts?.ready) document.fonts.ready.then(res, res);
      else res();
    })
  );
  drivers.push(new Promise((res) => (window.innerWidth ? setTimeout(res, 350) : window.addEventListener('load', () => setTimeout(res, 150), { once: true }))));

  let realDone = false;
  Promise.race([Promise.all(drivers), new Promise((r) => setTimeout(r, 4000))]).then(() => (realDone = true));
  // Creep toward 82% until real completion, then jump to 100%
  const creep = setInterval(() => {
    if (progress.v < 82) progress.v += Math.random() * 9 + 3;
    if (realDone && progress.v < 100) progress.v = Math.min(100, progress.v + 18);
  }, 160);

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        clearInterval(creep);
        el.remove();
        sessionStorage.setItem('ns-seen', '1');
        resolve();
      },
    });

    // route line draws while progress runs
    gsap.set(path, { strokeDasharray: `${pathLen}`, strokeDashoffset: pathLen });

    tl.from('.ns-pre-dots circle', { opacity: 0, scale: 0.2, stagger: 0.0018, duration: 0.7, transformOrigin: 'center' }, 0)
      .to(path, { strokeDashoffset: 0, duration: 2.0, ease: 'power2.inOut' }, 0.2)
      .to(movingDot, { opacity: 1, duration: 0.3 }, 0.2)
      .to(
        movingDot,
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          duration: 2.0,
          ease: 'power2.inOut',
        },
        0.2
      )
      .from(chars, { opacity: 0, y: 26, stagger: 0.055, duration: 0.75 }, 0.35)
      .from('.ns-pre-latin', { opacity: 0, letterSpacing: '0.6em', duration: 0.9 }, 0.8)
      .from('.ns-pre-progress', { opacity: 0, y: 10, duration: 0.5 }, 0.7)
      // progress updates
      .to(
        progress,
        {
          v: 100,
          duration: 1.9,
          ease: 'power1.inOut',
          onUpdate: () => {
            const p = Math.min(100, Math.round(Math.max(progress.v, realDone ? 100 : 0)));
            countEl.textContent = String(p).padStart(2, '0') + '%';
            barFill.style.width = p + '%';
          },
        },
        0.25
      )
      .to('.ns-pre-inner > *', { opacity: 0, y: -16, stagger: 0.06, duration: 0.5, ease: 'power2.in' }, '+=0.25')
      // veil exit — the two halves part like curtains
      .to('.ns-pre-veil.is-top', { yPercent: -101, duration: 0.85, ease: 'power4.inOut' }, '<0.15')
      .to('.ns-pre-veil.is-bottom', { yPercent: 101, duration: 0.85, ease: 'power4.inOut' }, '<')
      .set(el, { display: 'none' });
  });
}
