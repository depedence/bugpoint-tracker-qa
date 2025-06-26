import { Bug } from '../backend/src/models/bug';

const API_URL = 'http://localhost:5000/api/bugs';

const openColumn = document.getElementById('open-column')!;
const closedColumn = document.getElementById('closed-column')!;
const modal = document.getElementById('modal')!;
const form = document.getElementById('bugForm') as HTMLFormElement;

document.getElementById('addBugBtn')!.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

document.getElementById('cancelBtn')!.addEventListener('click', () => {
  modal.classList.add('hidden');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newBug = {
    title: (document.getElementById('title') as HTMLInputElement).value,
    description: (document.getElementById('description') as HTMLTextAreaElement).value,
    status: (document.getElementById('status') as HTMLSelectElement).value,
    priority: (document.getElementById('priority') as HTMLSelectElement).value,
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBug),
  });

  if (res.ok) {
    form.reset();
    modal.classList.add('hidden');
    loadBugs();
  }
});

async function loadBugs() {
  const res = await fetch(API_URL);
  const bugs: Bug[] = await res.json();

  openColumn.innerHTML = '';
  closedColumn.innerHTML = '';

  bugs.forEach((bug) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${bug.title}</h4>
      <p>${bug.description}</p>
      <small>Приоритет: ${bug.priority}</small><br/>
      <small>${new Date(bug.createdAt).toLocaleDateString()}</small>
    `;

    if (bug.status === 'open') openColumn.appendChild(card);
    else closedColumn.appendChild(card);
  });
}

loadBugs();
