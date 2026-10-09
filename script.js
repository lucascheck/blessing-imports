const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const setMenu = open => {
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => { if (!e.target.closest('.nav')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); });

const cards = document.getElementById('cards');
const step = () => cards.querySelector('.card').offsetWidth + 16;
document.getElementById('prev').onclick = () => cards.scrollBy({ left: -step(), behavior: 'smooth' });
document.getElementById('next').onclick = () => cards.scrollBy({ left: step(), behavior: 'smooth' });

document.getElementById('y').textContent = new Date().getFullYear();

const links = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  if (e.target.id) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
}), { threshold: .1 });

document.querySelectorAll('section[id]').forEach(s => io.observe(s));
document.querySelectorAll('.card,.step,.final-box,.about-txt').forEach(el => { el.classList.add('rv'); io.observe(el); });

// Arrastar o carrossel com o mouse (no celular o toque já funciona nativamente)
let down = false, moved = false, startX = 0, startLeft = 0;
cards.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  down = true; moved = false; startX = e.clientX; startLeft = cards.scrollLeft;
});
window.addEventListener('pointermove', e => {
  if (!down) return;
  const dx = e.clientX - startX;
  if (!moved && Math.abs(dx) > 5) { moved = true; cards.classList.add('dragging'); }
  if (moved) cards.scrollLeft = startLeft - dx;
});
window.addEventListener('pointerup', () => {
  if (!down) return;
  down = false;
  cards.classList.remove('dragging');
});
cards.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
cards.addEventListener('dragstart', e => e.preventDefault());
