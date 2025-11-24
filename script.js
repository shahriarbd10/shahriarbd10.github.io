// ===========================
// THEME HANDLING
// ===========================
(function () {
  const STORAGE_KEY = "shahriar-theme";
  const root = document.documentElement;
  const body = document.body;

  function applyTheme(theme) {
    const isLight = theme === "light";
    root.setAttribute("data-theme", isLight ? "light" : "dark");
    body.classList.toggle("light-mode", isLight);
  }

  function getPreferredTheme() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      // ignore storage errors
    }

    return "dark";
  }

  const initial = getPreferredTheme();
  applyTheme(initial);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current =
        root.getAttribute("data-theme") === "light" || body.classList.contains("light-mode")
          ? "light"
          : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore storage errors
      }
    });
  }
})();

// ===========================
// PRELOADER (SHAHRIAR HOSSAIN)
// ===========================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  // small delay for smoother transition
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 500);
});

// ===========================
// NAVBAR: MOBILE TOGGLE + ACTIVE LINK ON SCROLL
// ===========================
(function () {
  const navToggle = document.getElementById("navToggle");
  const navLinksContainer = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    // Close mobile nav when clicking a link
    link.addEventListener("click", () => {
      if (navLinksContainer) navLinksContainer.classList.remove("open");
    });
  });

  // Scroll spy is only useful on pages that have local sections (index.html)
  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (!sections.length) return;

  function handleScroll() {
    const scrollPos = window.scrollY + 130; // offset for sticky header
    let activeId = null;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        activeId = section.id;
        break;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isHashLink = href.startsWith("#"); // ignore external links (cv.html etc.)
      if (!isHashLink) {
        link.classList.toggle("active", false);
        return;
      }
      const id = href.slice(1);
      link.classList.toggle("active", id === activeId);
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
})();

// ===========================
// SCROLL REVEAL
// ===========================
(function () {
  const revealEls = document.querySelectorAll(".reveal, .reveal-delay");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// ===========================
// TILT EFFECT (for hero card + floating notes)
// ===========================
(function () {
  const tiltEls = document.querySelectorAll(".tilt");
  if (!tiltEls.length) return;

  function handleTilt(e) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;

    target.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    target.style.boxShadow = "0 24px 60px rgba(15, 23, 42, 0.6)";
  }

  function resetTilt(e) {
    const target = e.currentTarget;
    target.style.transform = "";
    target.style.boxShadow = "";
  }

  tiltEls.forEach((el) => {
    el.addEventListener("mousemove", handleTilt);
    el.addEventListener("mouseleave", resetTilt);
  });
})();

// ===========================
// FOOTER YEAR
// ===========================
(function () {
  const yearSpan = document.getElementById("footerYear");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
})();
