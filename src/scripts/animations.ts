import { animate, stagger } from 'animejs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const reveal = (selector: string, options: Record<string, unknown> = {}) => {
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;
    animate(targets, {
      opacity: { from: 0 },
      y: { from: 28 },
      duration: 850,
      delay: stagger(100),
      ease: 'out(3)',
      ...options,
    });
  };

  // Hero entrance sequence.
  reveal('.hero-copy > *', { delay: stagger(110, { start: 120 }) });
  animate('.journey-art', {
    opacity: { from: 0 },
    x: { from: 55 },
    scale: { from: 0.94 },
    duration: 1200,
    delay: 260,
    ease: 'out(4)',
  });

  // Run section entrances once when they become visible.
  const groups = new Map<Element, () => void>();
  document.querySelectorAll('.section-heading, .intro .narrow > :not(.intro-grid), .about-grid > div:last-child, .final-cta .container').forEach((element) => {
    groups.set(element, () => revealElement(element));
  });
  document.querySelectorAll('.approach-list, .meeting-grid').forEach((element) => {
    const children = element.querySelectorAll(':scope > article');
    groups.set(element, () => animate(children, {
      opacity: { from: 0 }, y: { from: 34 }, scale: { from: 0.97 },
      duration: 780, delay: stagger(120), ease: 'out(3)',
    }));
  });
  const portrait = document.querySelector('.portrait-placeholder');
  if (portrait) groups.set(portrait, () => animate(portrait, { opacity: { from: 0 }, x: { from: -45 }, duration: 950, ease: 'out(3)' }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      groups.get(entry.target)?.();
      groups.delete(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  groups.forEach((_, element) => observer.observe(element));

  const experience = document.querySelector('.experience-path');
  const experienceTrail = document.querySelector<SVGPathElement>('.experience-trail-draw');
  const experienceWalker = document.querySelector<HTMLElement>('.experience-walker');
  if (experience && experienceTrail && experienceWalker) {
    const trailLength = experienceTrail.getTotalLength();
    experienceTrail.style.strokeDasharray = `${trailLength}`;
    experienceTrail.style.strokeDashoffset = `${trailLength}`;
    const experienceObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const stations = experience.querySelectorAll('.station');
      animate(experienceTrail, { strokeDashoffset: [trailLength, 0], duration: 3600, ease: 'inOut(2)' });
      animate(experienceWalker, {
        opacity: [0, 1],
        x: [0, 245, 505, 750, 917],
        y: [330, 68, 300, 55, 282],
        rotate: [-8, 7, -5, 6, -4],
        duration: 3600,
        ease: 'inOut(2)',
      });
      animate(stations, { opacity: [0, 1], y: [28, 0], scale: [0.94, 1], duration: 650, delay: stagger(780, { start: 430 }), ease: 'out(3)' });
      experienceObserver.disconnect();
    }, { threshold: 0.24 });
    experienceObserver.observe(experience);
  }

  // Ambient movement inspired by the emblem.
  animate('.butterfly-one', { x: [-4, 9], y: [-5, 8], rotate: [-15, -5], duration: 4200, loop: true, alternate: true, ease: 'inOutSine' });
  animate('.butterfly-two', { x: [5, -8], y: [4, -9], rotate: [17, 27], duration: 5100, loop: true, alternate: true, ease: 'inOutSine' });
  animate('.dove-mark', { y: [-3, 6], x: [0, 4], duration: 4600, loop: true, alternate: true, ease: 'inOutSine' });
  animate('.logo-glow', { scale: [0.98, 1.055], opacity: [0.58, 0.9], duration: 5200, loop: true, alternate: true, ease: 'inOutSine' });
  animate('.journey-art > img', { scale: [1, 1.015], duration: 6500, loop: true, alternate: true, ease: 'inOutSine' });
  animate('.journey-path', { x: ['-2%', '4%'], scaleX: [0.98, 1.04], duration: 7600, loop: true, alternate: true, ease: 'inOutSine' });
  animate('.botanical', { rotate: [-4, 5], y: [-2, 4], duration: 3800, loop: true, alternate: true, ease: 'inOutSine' });

  // Scroll-linked walker following the journey path.
  const trail = document.querySelector<SVGPathElement>('.scroll-trail-progress');
  const walker = document.querySelector<HTMLElement>('.scroll-walker');
  if (trail && walker) {
    const length = trail.getTotalLength();
    trail.style.strokeDasharray = `${length}`;
    trail.style.strokeDashoffset = `${length}`;
    let ticking = false;
    const updateJourney = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
      const point = trail.getPointAtLength(length * progress);
      const next = trail.getPointAtLength(Math.min(length, length * progress + 2));
      const angle = Math.atan2(next.y - point.y, next.x - point.x) * 180 / Math.PI;
      trail.style.strokeDashoffset = `${length * (1 - progress)}`;
      walker.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${Math.max(-12, Math.min(12, angle - 90))}deg)`;
      walker.style.setProperty('--walk-step', `${Math.sin(progress * 90) * 3}px`);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateJourney); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', updateJourney);
    updateJourney();
  }
}

function revealElement(element: Element) {
  animate(element, {
    opacity: { from: 0 },
    y: { from: 30 },
    duration: 850,
    ease: 'out(3)',
  });
}
