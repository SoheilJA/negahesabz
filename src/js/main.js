import { initApp } from './core/app.js';

document.documentElement.classList.add('ns-js');

initApp().catch((err) => {
  console.error('[app] boot failure', err);
  // graceful degradation — render without animation
  document.getElementById('ns-preloader')?.remove();
  document.getElementById('ns-boot')?.remove();
});
