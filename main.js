// =============================================
//  SUPACHAI PORTFOLIO – main.js
// =============================================

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Smooth active nav ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cyan)' : '';
  });
});

/* ── Intersection Observer for reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .timeline-item, .skill-category').forEach(el => {
  revealObserver.observe(el);
});

/* ── Tilt effect on cards ── */
document.querySelectorAll('.about-card, .timeline-card, .skill-category').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Typing effect on hero title ── */
const titleEl = document.querySelector('.hero-title');
if (titleEl) {
  const titles = ['Senior Backend Developer', 'Microservices Architect', 'AWS Cloud Engineer', 'FinTech Enthusiast'];
  let idx = 0, charIdx = 0, deleting = false;
  function typeEffect() {
    const current = titles[idx];
    if (!deleting) {
      titleEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
    } else {
      titleEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; idx = (idx + 1) % titles.length; }
    }
    setTimeout(typeEffect, deleting ? 50 : 80);
  }
  typeEffect();
}

/* ── Particle background in hero ── */
(function createParticles() {
  const hero = document.getElementById('hero');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      width:${Math.random()*3+1}px;
      height:${Math.random()*3+1}px;
      background:rgba(${Math.random()>0.5?'99,179,237':'34,211,238'},${Math.random()*0.4+0.1});
      border-radius:50%;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      pointer-events:none;
      z-index:0;
      animation: particleFloat ${6+Math.random()*6}s ${Math.random()*4}s ease-in-out infinite;
    `;
    hero.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%,100%{transform:translate(0,0) scale(1);opacity:0.3}
      25%{transform:translate(${Math.random()*40-20}px,${Math.random()*-60}px) scale(1.5);opacity:0.8}
      75%{transform:translate(${Math.random()*40-20}px,${Math.random()*60}px) scale(0.8);opacity:0.2}
    }
  `;
  document.head.appendChild(style);
})();

/* ── Counter animation on stats ── */
function animateCounter(el, target) {
  let start = 0;
  const dur = 1500;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / dur, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

console.log('%c Supachai Sriphothong Portfolio ', 'background:#3b82f6;color:#fff;font-size:16px;padding:8px 16px;border-radius:8px;font-weight:bold;');
