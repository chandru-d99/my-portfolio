// Simple animations + typewriter + reveal on scroll

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typewriter for subtitle (if element exists)
  const typedEl = document.querySelector('.subtitle-typed');
  const texts = ['a BCA Student', 'Web Developer (learning)', 'Python • C • JavaScript'];
  if (typedEl) {
    let ti = 0, ci = 0;
    const type = () => {
      const txt = texts[ti];
      typedEl.textContent = txt.slice(0, ++ci);
      if (ci === txt.length) {
        // pause then erase
        setTimeout(() => erase(), 900);
      } else {
        setTimeout(type, 70);
      }
    };
    const erase = () => {
      const txt = texts[ti];
      typedEl.textContent = txt.slice(0, --ci);
      if (ci === 0) {
        ti = (ti + 1) % texts.length;
        setTimeout(type, 200);
      } else {
        setTimeout(erase, 40);
      }
    };
    type();
  }

  // 2) Pop the profile photo
  const photo = document.querySelector('.profile-photo');
  if (photo) {
    // small delay to let the page paint
    setTimeout(() => photo.classList.add('pop'), 350);
  }

  // 3) IntersectionObserver reveal for .fade-in and skills list
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12
  };
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // for list items (skills)
        if (el.tagName.toLowerCase() === 'li') {
          el.classList.add('visible');
        } else {
          el.classList.add('visible');
        }
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  // observe all elements with .fade-in and skills li
  document.querySelectorAll('.fade-in, .skills-list li').forEach(el => {
    revealObserver.observe(el);
  });

  // 4) sticky header small behaviour
  const header = document.querySelector('.site-header');
  if (header) {
    const stickyToggle = () => {
      if (window.scrollY > 20) header.classList.add('sticky');
      else header.classList.remove('sticky');
    };
    stickyToggle();
    window.addEventListener('scroll', stickyToggle);
  }
});
