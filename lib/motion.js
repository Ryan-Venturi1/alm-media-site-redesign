// Scroll motion engine — one instance per page, started by the site header.
//
//   .alm-in / .alm-wipe  revealed once when they enter the viewport
//   [data-scrub]         receive --p (0…1) every animation frame:
//       exit   hero leaving the top of the screen
//       enter  element rising from the bottom to ~25% from the top
//       cover  a full pass through the viewport (parallax)
//       text   reading pace for statement fills
//       pin    progress through a tall section with a sticky stage
//              (also sets --e for its entrance and data-step for chapters)
//   .alm-hs              horizontal card track driven by its pin progress
//
// The look of every effect lives in app/globals.css under html.alm-motion;
// this file only measures and writes CSS custom properties and classes.

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function startMotion(host) {
  if (typeof window === 'undefined') return () => {};
  const win = window;
  const doc = win.document;
  const html = doc.documentElement;
  const reduce = !!(win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const hasIO = 'IntersectionObserver' in win;
  const on = !reduce && hasIO;

  html.classList.toggle('alm-motion', on);
  win.__almMotionReady = true;
  if (!on) return () => {};

  const M = { scrub: [], lastY: 0, ticking: false, timers: [], fixed: null, rescanT: 0 };

  const reveal = (list) => {
    list.sort((a, b) => (a.compareDocumentPosition(b) & 4 ? -1 : 1));
    list.forEach((el, i) => {
      el.style.setProperty('--d', (Math.min(i, 7) * 0.085).toFixed(3) + 's');
      el.classList.add('is-in');
      io.unobserve(el);
    });
  };
  const io = new IntersectionObserver(
    (entries) => reveal(entries.filter((e) => e.isIntersecting).map((e) => e.target)),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  const setupHS = () => {
    doc.querySelectorAll('.alm-hs').forEach((sec) => {
      const track = sec.querySelector('[data-track]');
      const ok = track && win.innerWidth >= 900 && win.innerHeight >= 640;
      sec.classList.toggle('alm-hs-on', !!ok);
      if (!ok) return;
      const last = track.children[track.children.length - 1];
      if (!last) return;
      const tr = track.getBoundingClientRect();
      const lr = last.getBoundingClientRect();
      const hx = Math.max(0, Math.round(lr.right - tr.left + 16 - track.clientWidth));
      if (sec.__hx !== hx) {
        sec.__hx = hx;
        sec.style.setProperty('--hx', hx + 'px');
      }
    });
  };

  const update = () => {
    M.ticking = false;
    const vh = win.innerHeight;
    const y = win.pageYOffset || html.scrollTop || 0;
    const se = doc.scrollingElement || html;
    html.style.setProperty('--sp', clamp(y / Math.max(1, se.scrollHeight - vh)).toFixed(4));

    for (const el of M.scrub) {
      const r = el.getBoundingClientRect();
      const mode = el.getAttribute('data-scrub');
      let p;
      if (mode === 'exit') p = clamp(-r.top / Math.max(1, r.height));
      else if (mode === 'cover') p = clamp((vh - r.top) / (vh + r.height));
      else if (mode === 'text') p = clamp((vh * 0.86 - r.top) / (vh * 0.42 + r.height));
      else if (mode === 'pin') {
        p = clamp(-r.top / Math.max(1, r.height - vh));
        el.style.setProperty('--e', clamp((vh - r.top) / vh).toFixed(4));
        const n = +el.getAttribute('data-steps') || 0;
        if (n) {
          const s = Math.min(n - 1, Math.floor(p * n));
          if (el.__step !== s) {
            el.__step = s;
            el.setAttribute('data-step', String(s));
          }
        }
      } else p = clamp((vh - r.top) / (vh * 0.75));
      el.style.setProperty('--p', p.toFixed(4));
    }

    // header: fixed after the utility strip, hides going down, returns going up
    const bar = host && host.bar;
    const head = host && host.head;
    if (bar && head) {
      const util = head.firstElementChild;
      const fixed = y > (util && util !== bar ? util.offsetHeight : 0);
      if (fixed !== M.fixed) {
        M.fixed = fixed;
        head.style.setProperty('--nb', bar.offsetHeight + 'px');
        head.classList.toggle('is-fixed', fixed);
        bar.classList.toggle('is-fixed', fixed);
      }
      const dy = y - M.lastY;
      if (y < 420) bar.classList.remove('is-hidden');
      else if (dy > 6) bar.classList.add('is-hidden');
      else if (dy < -6) bar.classList.remove('is-hidden');
    }
    M.lastY = y;
  };

  const scan = () => {
    setupHS();
    M.scrub = Array.from(doc.querySelectorAll('[data-scrub]'));
    const above = [];
    doc.querySelectorAll('.alm-in:not(.is-in), .alm-wipe:not(.is-in)').forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) above.push(el);
      else io.observe(el);
    });
    above.forEach((el) => {
      el.style.setProperty('--d', '0s');
      el.classList.add('is-in');
    });
    update();
  };

  const onScroll = () => {
    if (M.ticking) return;
    M.ticking = true;
    win.requestAnimationFrame(update);
  };
  const rescanSoon = () => {
    clearTimeout(M.rescanT);
    M.rescanT = setTimeout(scan, 160);
  };

  win.addEventListener('scroll', onScroll, { passive: true });
  win.addEventListener('resize', rescanSoon);
  win.addEventListener('load', rescanSoon);
  // new cards (filters, tabs, route changes) get picked up automatically
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType === 1) {
          rescanSoon();
          return;
        }
      }
    }
  });
  mo.observe(doc.body, { childList: true, subtree: true });
  // images and fonts settle over the first moments
  [0, 250, 900, 2000].forEach((t) => M.timers.push(setTimeout(scan, t)));

  return () => {
    win.removeEventListener('scroll', onScroll);
    win.removeEventListener('resize', rescanSoon);
    win.removeEventListener('load', rescanSoon);
    mo.disconnect();
    io.disconnect();
    M.timers.forEach(clearTimeout);
    clearTimeout(M.rescanT);
  };
}
