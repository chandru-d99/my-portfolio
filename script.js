// Improved script.js — reveal animations, stagger, and smooth anchors
document.addEventListener('DOMContentLoaded', () => {
  // Elements to reveal: any element with .reveal OR all section elements
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const sections = Array.from(document.querySelectorAll('section'));

  // If no .reveal elements exist, fall back to using sections
  const targets = revealEls.length ? revealEls : sections;

  // 1) set staggered animation delays for sections and their children
  sections.forEach((s, i) => {
    const delay = i * 0.15;
    s.style.animationDelay = delay + 's';

    const children = s.querySelectorAll('.skill, p, h2, .hero-title, .hero-sub, .hero-btn, .about-img, .section-title, .hero-img');
    children.forEach((c, j) => {
      c.style.animationDelay = (delay + 0.12 + j * 0.06) + 's';
    });
  });

  // 2) IntersectionObserver to add .active when element is visible
  const revealOptions = { root: null, rootMargin: '0px', threshold: 0.12 };

  function onIntersect(entries, obs) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(onIntersect, revealOptions);
    targets.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers: simple scroll check
    const revealOnScroll = () => {
      const windowH = window.innerHeight;
      targets.forEach(el => {
        const rectTop = el.getBoundingClientRect().top;
        if (rectTop < windowH - 120) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }

  // 3) Smooth scrolling for anchor links (with scrollIntoView)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // update hash without jumping
          history.replaceState(null, '', href);
        }
      }
    });
  });

}); // DOMContentLoaded end
