// Ref callback for silent background videos: muted inline loops that play
// only while they are on (or near) screen, and stay paused for visitors who
// prefer reduced motion. Hero videos also carry autoPlay so they start before
// hydration; videos further down the page load only when you reach them.
export function playWhenVisible(el) {
  if (!el || el.__almVideo) return;
  el.__almVideo = true;
  el.muted = true;
  el.defaultMuted = true;
  el.loop = true;
  el.playsInline = true;
  el.setAttribute('muted', '');
  el.setAttribute('playsinline', '');

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    el.pause();
    return;
  }
  const play = () => {
    const p = el.play();
    if (p && p.catch) p.catch(() => {});
  };
  if (!('IntersectionObserver' in window)) {
    play();
    return;
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!el.isConnected) {
        io.disconnect();
        return;
      }
      if (entry.isIntersecting) {
        if (el.preload === 'none') el.preload = 'auto';
        play();
      } else if (!el.paused) {
        el.pause();
      }
    },
    { rootMargin: '600px 0px' },
  );
  io.observe(el);
}
