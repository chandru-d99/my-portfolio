

// scroll reveal animation
function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
reveal();

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // 1) stagger animation delays for sections and their children
  const sections = document.querySelectorAll('main section');
  sections.forEach((s, i) => {
    const delay = i * 0.15;
    s.style.animationDelay = (delay) + 's';

    const children = s.querySelectorAll('.skill, p, h2, .hero-title, .hero-sub, .hero-btn, .about-img');
    children.forEach((c, j) => {
      c.style.animationDelay = (delay + 0.12 + j * 0.06) + 's';
    });
  });

  // 2) intersection observer to reveal only when in view (improves performance)
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('visible'); // not required but useful for debugging
        // if section has children that had animation inline delay, they will animate automatically
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  document.querySelectorAll('main section').forEach(el => revealObserver.observe(el));

  // 3) Smooth scrolling for anchor clicks (works on all browsers)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // use scrollIntoView with offset from CSS scroll-margin-top
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href); // updates URL hash without extra scrolling
        }
      }
    });
  });
});
