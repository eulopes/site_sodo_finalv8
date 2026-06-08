/* =============================================================
   SODO ELÉTRICA — main.js
   Módulos: Header, Menu Mobile, Scroll Reveal, Smooth Scroll.
   ============================================================= */

/* ──────────────────────────────────────────────────────────
   1. HEADER — efeito de scroll
   ────────────────────────────────────────────────────────── */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(10,17,24,0.98)';
      header.style.boxShadow = '0 1px 0 rgba(255,255,255,0.07)';
    } else {
      header.style.background = 'rgba(10,17,24,0.95)';
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // estado inicial
})();


/* ──────────────────────────────────────────────────────────
   2. MENU MOBILE — hambúrguer
   ────────────────────────────────────────────────────────── */
(function initMobileMenu() {
  const btn   = document.getElementById('menu-btn');
  const menu  = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.style.display === 'flex';

    if (isOpen) {
      menu.style.display = 'none';
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      menu.style.display = 'flex';
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Fecha o menu ao clicar em qualquer link interno
  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      menu.style.display = 'none';
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ──────────────────────────────────────────────────────────
   3. SCROLL REVEAL — IntersectionObserver
   ────────────────────────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Se o browser não suporta IntersectionObserver, mostra tudo
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animação acontece uma vez
        }
      });
    },
    {
      threshold: 0.12,   // visível quando 12% do elemento está na viewport
      rootMargin: '0px 0px -40px 0px', // ativa um pouco antes de entrar
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────────────────────────────────
   4. SMOOTH SCROLL — links de âncora
   ────────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id     = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const headerH = document.getElementById('header')?.offsetHeight || 72;
      const top     = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();



/* 5 EFEITO DE ANIMAÇÃO SERVICE CARDS */

card.style.setProperty('--x', `${x}px`);
card.style.setProperty('--y', `${y}px`);