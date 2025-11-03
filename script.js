// Scroll animation observer
const fadeEls = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => obs.observe(el));
