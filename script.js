/* ===========================
   Navigation scroll state
   =========================== */
/* Always start at the top of the page on load */
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const header = document.querySelector('.site-header');

/* Logo click — scroll to top */
document.querySelectorAll('a.logo').forEach(logo => {
  logo.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ===========================
   Mobile nav toggle
   =========================== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===========================
   Scroll reveal
   =========================== */
const revealEls = document.querySelectorAll(
  '.service-card, .process-step, .about-content, .about-visual, .contact-card, .section-header'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger cards within grids
  const parent = el.parentElement;
  if (parent.classList.contains('services-grid') || parent.classList.contains('process-steps')) {
    const siblings = Array.from(parent.children);
    const idx = siblings.indexOf(el);
    if (idx === 1) el.classList.add('reveal-delay-1');
    if (idx === 2) el.classList.add('reveal-delay-2');
    if (idx === 3) el.classList.add('reveal-delay-3');
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ===========================
   Contact form
   =========================== */
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('#name').value.trim();

  // Simple validation
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'rgba(255,100,100,0.6)';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) return;

  // Simulate sending
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    btn.style.background = 'var(--color-accent)';
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
    }, 3500);
  }, 1000);
});

/* Clear error styles on input */
form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.style.borderColor = '';
  });
});

/* ===========================
   Smooth active nav link
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.btn)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--color-accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
