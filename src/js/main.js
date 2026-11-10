import { initApp } from './core/app.js';

document.documentElement.classList.add('ns-js');

initApp().catch((err) => {
  console.error('[app] boot failure', err);
  // graceful degradation — always clear overlays so site is usable
  try { document.getElementById('ns-preloader')?.remove(); } catch {}
  try { document.getElementById('ns-boot')?.remove(); } catch {}
  try {
    const main = document.getElementById('main');
    if (main && !main.childElementCount) {
      main.innerHTML = '<div style="padding:6rem 1.5rem;text-align:center;color:#e8e0d0"><h1 style="margin:0 0 .5rem">Negah Sabz</h1><p style="opacity:.7">خطا در بارگذاری. صفحه را رفرش کنید.</p></div>';
    }
  } catch {}
});
