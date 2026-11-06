// Word cycle: shows one word at a time in the same central spot. Each word fades in
// (rising a few pixels), holds, then fades out (rising a little more) before the next
// word appears. Reusable: any [data-word-cycle] element whose children are .wc-word.
// Optional data attributes: data-in, data-hold, data-out (ms) and data-rise (px).
// Runs on the Web Animations API (opacity and transform only), so every word shares one
// timeline and the loop never drifts. It pauses while off screen.
export function wordCycle(el) {
  const words = [...el.querySelectorAll('.wc-word')];
  if (words.length < 2 || !el.animate) return;
  const fadeIn = +el.dataset.in || 600, hold = +el.dataset.hold || 700, fadeOut = +el.dataset.out || 600;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rise = reduced ? 0 : (+el.dataset.rise || 4);
  const slot = fadeIn + hold + fadeOut, total = slot * words.length;
  const at = ms => ms / total;
  const ease = 'ease-in-out';
  const frames = [
    {offset: 0, opacity: 0, transform: `translateY(${rise}px)`, easing: ease},
    {offset: at(fadeIn), opacity: 1, transform: 'translateY(0)', easing: ease},
    {offset: at(fadeIn + hold), opacity: 1, transform: 'translateY(0)', easing: ease},
    {offset: at(slot), opacity: 0, transform: `translateY(${-rise}px)`},
    {offset: 1, opacity: 0, transform: `translateY(${-rise}px)`}
  ];
  el.classList.add('wc-live');
  const anims = words.map((w, i) => w.animate(frames, {duration: total, delay: i * slot, iterations: Infinity, fill: 'backwards'}));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => anims.forEach(a => (e.isIntersecting ? a.play() : a.pause())), {rootMargin: '40px'}).observe(el);
  }
}

export function init(root = document) {
  root.querySelectorAll('[data-word-cycle]').forEach(wordCycle);
}
