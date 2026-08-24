const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.menu-close');

function setMenu(open) {
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

menuButton.addEventListener('click', () => setMenu(true));
menuClose.addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const cursorGlow = document.querySelector('.cursor-glow');
const heroScene = document.querySelector('.hero-scene');
let pointerX = window.innerWidth * 0.7;
let pointerY = window.innerHeight * 0.4;

window.addEventListener('pointermove', (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  cursorGlow.style.left = `${pointerX}px`;
  cursorGlow.style.top = `${pointerY}px`;

  if (window.innerWidth > 768) {
    const shiftX = (pointerX / window.innerWidth - 0.5) * 18;
    const shiftY = (pointerY / window.innerHeight - 0.5) * 18;
    heroScene.style.translate = `${shiftX}px ${shiftY}px`;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

const rotatingSkill = document.querySelector('#rotating-skill');
const skillTitles = [
  'CI/CD Automation',
  'Make & CMake',
  'GitLab Pipelines',
  'Release Automation',
  'Kubernetes',
  'AWS Cloud',
  'Linux Systems'
];
let skillIndex = 0;

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    rotatingSkill.classList.add('is-changing');
    window.setTimeout(() => {
      skillIndex = (skillIndex + 1) % skillTitles.length;
      rotatingSkill.textContent = skillTitles[skillIndex];
      rotatingSkill.classList.remove('is-changing');
      rotatingSkill.classList.add('is-entering');
      window.setTimeout(() => rotatingSkill.classList.remove('is-entering'), 450);
    }, 280);
  }, 2600);
}

window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((element) => element.classList.add('visible'));
  if (window.lucide) window.lucide.createIcons({ 'stroke-width': 1.5 });
});
