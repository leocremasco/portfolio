/* ===========================
   NAV SCROLL
   =========================== */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===========================
   PARTICLE CANVAS
   =========================== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
    ctx.fill();
  });

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  animationId = requestAnimationFrame(drawParticles);
}

// Only run particles if no reduced motion preference
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  resize();
  createParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

/* ===========================
   COUNTER ANIMATION
   =========================== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.metric__number').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroMetrics = document.querySelector('.hero__metrics');
if (heroMetrics) counterObserver.observe(heroMetrics);

/* ===========================
   SCROLL FADE-IN
   =========================== */
const fadeElements = document.querySelectorAll(
  '.sobre__text, .sobre__education, .stack-group, .project-card, .timeline-item, .contact__inner'
);

fadeElements.forEach(el => el.classList.add('fade-in-up'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * i);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

/* ===========================
   CONTACT FORM
   =========================== */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

function showError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (input) input.classList.add('error');
  if (errorEl) errorEl.textContent = msg;
}

function clearErrors() {
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    if (!name) {
      showError('name', 'Por favor, informe seu nome.');
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      showError('email', 'Informe um e-mail válido.');
      valid = false;
    }
    if (!message) {
      showError('message', 'A mensagem não pode estar vazia.');
      valid = false;
    }

    if (!valid) return;

    submitBtn.querySelector('.btn-text').hidden = true;
    submitBtn.querySelector('.btn-loading').hidden = false;
    submitBtn.disabled = true;

    // Simulate submission — replace with your backend/Formspree endpoint
    await new Promise(r => setTimeout(r, 1500));

    // ---- OPTION A: Formspree (recommended for GitHub Pages) ----
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, message }),
    // });
    // if (response.ok) { ... }

    form.reset();
    submitBtn.querySelector('.btn-text').hidden = false;
    submitBtn.querySelector('.btn-loading').hidden = true;
    submitBtn.disabled = false;
    formSuccess.hidden = false;

    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  });
}

/* ===========================
   FOOTER YEAR
   =========================== */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===========================
   ACTIVE NAV LINK (scroll spy)
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${entry.target.id}`) {
          a.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => spyObserver.observe(s));

/* ===========================
   POWER BI EMBED LOADER
   =========================== */
   const PBI_REPORTS = {
    'pbi-alarmes': 'https://app.powerbi.com/view?r=eyJrIjoiZDRlYTM1ZGUtMGI5NS00ZjdmLTllOTItN2I1Y2I4ZDQzNjMyIiwidCI6IjRjMzMwMTc0LWI0NjMtNDAwYy1hODRiLWVlM2M2YjcwNWM2MiJ9',
  };
  
  function loadPBI(containerId, inputId) {
    const input = document.getElementById(inputId);
    const url = (input ? input.value.trim() : '') || PBI_REPORTS[containerId];
    const container = document.getElementById(containerId);
  
    if (!url || !url.includes('powerbi.com')) {
      if (input) input.style.borderColor = '#e53e3e';
      return;
    }
  
    container.classList.add('pbi-placeholder--loaded');
    container.innerHTML = `<iframe src="${url}" allowFullScreen="true"></iframe>`;
  }
  
  // Carrega automaticamente apenas os reports com link fixo
  document.addEventListener('DOMContentLoaded', () => {
    Object.keys(PBI_REPORTS).forEach(id => loadPBI(id, null));
  });