const stories = [
  { title: 'The Last Horizon', genre: 'Sci-fi · 2025', image: 'https://images.unsplash.com/photo-1534791547706-9d8a9e9c5b75?auto=format&fit=crop&w=600&q=85', description: 'When the last star begins to fade, a quiet cartographer must map a path through the unknown to bring humanity home.' },
  { title: 'Afterglow', genre: 'Drama · 2024', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=85', description: 'Two strangers find each other in the beautiful mess left behind by a city that never sleeps.' },
  { title: 'Wildflower', genre: 'Documentary · 2025', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=85', description: 'A visual love letter to the resilient life growing in the most unexpected places.' },
  { title: 'Redline', genre: 'Action · 2024', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=85', description: 'One final race. One impossible choice. There is no room for the brakes.' },
  { title: 'Moth & Moon', genre: 'Mystery · 2025', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=85', description: 'A nocturnal detective follows a trail of impossible lights through a sleeping town.' },
  { title: 'Small Hours', genre: 'Comedy · 2023', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=85', description: 'A warm, funny portrait of the people who keep the night alive.' },
  { title: 'Saltwater', genre: 'Adventure · 2024', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=85', description: 'The ocean remembers everything. A daughter returns to find out what it knows.' },
  { title: 'Still / Moving', genre: 'Indie · 2025', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=85', description: 'A journey inward, told in quiet frames and loud colors.' }
];
const continueStories = [stories[0], stories[3], stories[5], stories[6]];
const savedStories = [stories[1], stories[2], stories[4], stories[7]];
const $ = (selector) => document.querySelector(selector);

function renderRow(selector, items, progress = false) {
  const row = $(selector);
  row.innerHTML = items.map((story, i) => `<article class="poster" data-title="${story.title}"><img loading="lazy" src="${story.image}" alt="${story.title} poster"><button class="plus" aria-label="Add ${story.title} to My List">＋</button><div class="poster-info"><b>${story.title}</b><small>${story.genre}</small></div>${progress ? `<div class="progress" style="width:${[42, 68, 25, 81][i] || 40}%"></div>` : ''}</article>`).join('');
  row.querySelectorAll('.poster').forEach(card => card.addEventListener('click', (event) => { if (!event.target.closest('.plus')) openModal(card.dataset.title); }));
  row.querySelectorAll('.plus').forEach(button => button.addEventListener('click', (event) => { event.stopPropagation(); button.textContent = button.textContent === '✓' ? '＋' : '✓'; }));
}
function openModal(title) { const story = stories.find(item => item.title === title) || stories[0]; $('#modalTitle').textContent = story.title; $('#modalDescription').textContent = story.description; $('#modalArt').style.backgroundImage = `linear-gradient(0deg,#211f20,transparent), url('${story.image}')`; $('#modal').classList.add('open'); }
renderRow('#trendingRow', stories); renderRow('#continueRow', continueStories, true); renderRow('#listRow', savedStories);

document.querySelectorAll('[data-info]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.info)));
document.querySelectorAll('[data-play]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.play)));
$('.modal-close').addEventListener('click', () => $('#modal').classList.remove('open'));
$('#modal').addEventListener('click', (event) => { if (event.target === $('#modal')) $('#modal').classList.remove('open'); });
$('#modalPlay').addEventListener('click', () => { $('#modalPlay').textContent = '✓ Now playing'; });
$('.rail-next').addEventListener('click', () => $('#trendingRow').scrollBy({ left: 370, behavior: 'smooth' }));
$('.rail-prev').addEventListener('click', () => $('#trendingRow').scrollBy({ left: -370, behavior: 'smooth' }));
$('.search-toggle').addEventListener('click', () => { $('.search-box').classList.toggle('open'); if ($('.search-box').classList.contains('open')) $('#searchInput').focus(); });
$('#searchInput').addEventListener('input', (event) => { const query = event.target.value.toLowerCase(); document.querySelectorAll('.poster').forEach(card => { card.style.display = card.dataset.title.toLowerCase().includes(query) ? '' : 'none'; }); });
$('#profileButton').addEventListener('click', () => $('#profileMenu').classList.toggle('open'));
window.addEventListener('scroll', () => $('#header').classList.toggle('scrolled', window.scrollY > 30));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { $('#modal').classList.remove('open'); $('#profileMenu').classList.remove('open'); } });
