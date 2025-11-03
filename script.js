// Subtle fade-in animation on scroll
const faders = document.querySelectorAll('.project-card, .tech-section, .projects-section h2');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('fade');
  });
}, { threshold: 0.2 });
faders.forEach(el => observer.observe(el));
