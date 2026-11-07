// Word cycle: shows one word at a time in the same central spot. Each word fades in
// (rising a few pixels), holds, then fades out (rising a little more) before the next
// word appears. Reusable: any [data-word-cycle] element whose children are .wc-word.
// Optional data attributes: data-in, data-hold, data-out (ms) and data-rise (px).
// data-once plays the sequence a single time and keeps the last word on screen; the
// returned promise resolves when it ends (the intro loader uses this).
// Runs on the Web Animations API (opacity and transform only), so the words share one
// timeline and never drift. A looping cycle pauses while off screen.
export function wordCycle(el) {
  const words = [...el.querySelectorAll('.wc-word')];
  if (words.length < 2 || !el.animate) return Promise.resolve();
  const fadeIn = +el.dataset.in || 600, hold = +el.dataset.hold || 700, fadeOut = +el.dataset.out || 600;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rise = reduced ? 0 : (+el.dataset.rise || 4);
  const once = 'once' in el.dataset;
  const slot = fadeIn + hold + fadeOut, total = slot * words.length;
  const ease = 'ease-in-out';
  const enter = [{opacity: 0, transform: `translateY(${rise}px)`, easing: ease}, {opacity: 1, transform: 'translateY(0)', easing: ease}];
  const exit = [{opacity: 1, transform: 'translateY(0)', easing: ease}, {opacity: 0, transform: `translateY(${-rise}px)`}];
  el.classList.add('wc-live');
  el.style.setProperty('--wc-total', (once ? total - fadeOut : total) + 'ms');
  if (once) {
    // Each word plays inside its own slot; the last word stays.
    const anims = words.map((w, i) => {
      const last = i === words.length - 1, d = last ? fadeIn + hold : slot;
      const f = last
        ? [{offset: 0, ...enter[0]}, {offset: fadeIn / d, ...enter[1]}, {offset: 1, opacity: 1, transform: 'translateY(0)'}]
        : [{offset: 0, ...enter[0]}, {offset: fadeIn / d, ...enter[1]}, {offset: (fadeIn + hold) / d, ...exit[0]}, {offset: 1, ...exit[1]}];
      return w.animate(f, {duration: d, delay: i * slot, fill: last ? 'both' : 'backwards'});
    });
    return anims[anims.length - 1].finished.then(() => {}, () => {});
  }
  const at = ms => ms / total;
  const frames = [
    {offset: 0, ...enter[0]},
    {offset: at(fadeIn), ...enter[1]},
    {offset: at(fadeIn + hold), ...exit[0]},
    {offset: at(slot), ...exit[1]},
    {offset: 1, opacity: 0, transform: `translateY(${-rise}px)`}
  ];
  const anims = words.map((w, i) => w.animate(frames, {duration: total, delay: i * slot, iterations: Infinity, fill: 'backwards'}));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => anims.forEach(a => (e.isIntersecting ? a.play() : a.pause())), {rootMargin: '40px'}).observe(el);
  }
  return Promise.resolve();
}

export function init(root = document) {
  root.querySelectorAll('[data-word-cycle]').forEach(wordCycle);
}
