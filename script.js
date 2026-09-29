const observer = new IntersectionObserver((entries) => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${y*-5}deg) translateY(-4px)`; });
    card.addEventListener('mouseleave', () => card.style.transform='');
  });
}

const progress = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-to-top');
const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

function updatePageState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll ? (window.scrollY / maxScroll) * 100 : 0}%`;
  backToTop.classList.toggle('visible', window.scrollY > 500);
  const current = sections.reduce((active, section) => window.scrollY >= section.offsetTop - 140 ? section : active, sections[0]);
  navLinks.forEach(link => link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`));
}
window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
updatePageState();
