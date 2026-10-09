const menu = document.getElementById('menu');
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

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
