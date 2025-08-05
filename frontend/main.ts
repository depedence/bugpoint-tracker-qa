import { Bug } from '../backend/src/models/bug';

const API_URL = 'http://localhost:5000/api/bugs';

const openColumn = document.getElementById('open-column')!;
const closedColumn = document.getElementById('closed-column')!;
const modal = document.getElementById('modal')!;
const form = document.getElementById('bugForm') as HTMLFormElement;

const editModal = document.getElementById('editModal')!;
const editForm = document.getElementById('editForm') as HTMLFormElement;
const cancelEditBtn = document.getElementById('cancelEditBtn')!;

function showToast(message: string) {
    const toast = document.getElementById('toast')!;
    toast.textContent = message;
    toast.classList.add('show');
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 2000);
}

interface HTMLElementEventMap {
    dragstart: DragEvent;
    dragover: DragEvent;
    drop: DragEvent;
}

const addBugBtn = document.getElementById('addBugBtn')!;
const cancelBtn = document.getElementById('cancelBtn')!;

addBugBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
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

function setupDragStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .card.dragging {
      opacity: 0.5;
      transform: scale(0.95);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .column.drop-zone {
      background-color: rgba(0, 82, 204, 0.1);
      transition: background-color 0.2s;
    }
    .column.empty {
      min-height: 100px;
      position: relative;
    }
    .column.empty::after {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      text-align: center;
      color: var(--muted);
    }
    .card-ghost {
      position: absolute;
      background: white;
      border: 1px solid #dfe1e6;
      border-radius: 8px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      pointer-events: none;
      z-index: 999;
      transition: transform 0.1s;
    }
    .fade-out {
      animation: fadeOut 0.2s ease-out forwards;
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.9); }
    }
  `;
    document.head.appendChild(style);
}

function updateEmptyColumns() {
    const openHasCards = openColumn.querySelectorAll('.card').length > 0;
    const closedHasCards = closedColumn.querySelectorAll('.card').length > 0;

    openColumn.classList.toggle('empty', !openHasCards);
    closedColumn.classList.toggle('empty', !closedHasCards);
}

async function loadBugs() {
    const res = await fetch(API_URL);
    const bugs: Bug[] = await res.json();

    const openContainer = openColumn.querySelector('.cards-container')!;
    const closedContainer = closedColumn.querySelector('.cards-container')!;

    openContainer.innerHTML = '';
    closedContainer.innerHTML = '';

    bugs.forEach((bug) => {
        const card = document.createElement('div');
        card.className = `card ${bug.priority}-priority`;
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-id', bug.id);
        card.innerHTML = `
      <button class="delete-btn" data-id="${bug.id}">x</button>
      <button class="editBtn" data-id="${bug.id}">Редактировать</button>
      <h4>${bug.title}</h4>
      <p>${bug.description}</p>
      <small>Приоритет: ${bug.priority}</small><br/>
      <small>${new Date(bug.createdAt).toLocaleDateString()}</small>
    `;

        card.addEventListener('dragstart', function (this: HTMLElement, e: Event) {
            const ev = e as DragEvent;
            this.classList.add('dragging');
            ev.dataTransfer?.setData('text/plain', bug.id);
        });

        card.addEventListener('dragend', function (this: HTMLElement) {
            this.classList.remove('dragging');
        });

        if (bug.status === 'open') {
            openContainer.appendChild(card);
        } else {
            closedContainer.appendChild(card);
        }

        const deleteBtn = card.querySelector('.delete-btn')!;
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bugId = (e.target as HTMLElement).getAttribute('data-id');
            if (!bugId) return;

            const confirmModal = document.getElementById('confirmModal')!;
            const confirmDeleteBtn = document.getElementById('confirmDeleteBtn')!;
            const cancelDeleteBtn = document.getElementById('cancelDeleteBtn')!;
            confirmModal.classList.remove('hidden');

            const onConfirm = async () => {
                try {
                    const res = await fetch(API_URL, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: bugId }),
                    });

                    if (res.ok) {
                        card.remove();
                        updateEmptyColumns();
                        showToast('Тикет успешно удалён');
                    } else {
                        alert('Ошибка при удалении бага');
                    }
                } catch (error) {
                    console.error('Ошибка при удалении бага:', error);
                    alert('Ошибка при отправке запроса');
                } finally {
                    confirmModal.classList.add('hidden');
                    confirmDeleteBtn.removeEventListener('click', onConfirm);
                }
            };

            confirmDeleteBtn.addEventListener('click', onConfirm);
            cancelDeleteBtn.onclick = () => {
                confirmModal.classList.add('hidden');
                confirmDeleteBtn.removeEventListener('click', onConfirm);
            };
        });

        const editBtn = card.querySelector('.editBtn')!;
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const editId = document.getElementById('editId') as HTMLInputElement;
            const editTitle = document.getElementById('editTitle') as HTMLInputElement;
            const editDescription = document.getElementById(
                'editDescription'
            ) as HTMLTextAreaElement;
            const editPriority = document.getElementById('editPriority') as HTMLSelectElement;
            const editStatus = document.getElementById('editStatus') as HTMLSelectElement;

            editId.value = bug.id;
            editTitle.value = bug.title;
            editDescription.value = bug.description;
            editPriority.value = bug.priority;
            editStatus.value = bug.status;

            editModal.classList.remove('hidden');
        });
    });
}

setupDragStyles();

[openColumn, closedColumn].forEach((column) => {
    const dropZone = column.querySelector('.cards-container')!;

    dropZone.addEventListener('dragover', function (this: HTMLElement, e: Event) {
        const ev = e as DragEvent;
        ev.preventDefault();
        column.classList.add('highlight');
    });

    dropZone.addEventListener('dragleave', function (this: HTMLElement) {
        column.classList.remove('highlight');
    });

    dropZone.addEventListener('drop', async function (this: HTMLElement, e: Event) {
        const ev = e as DragEvent;
        ev.preventDefault();
        column.classList.remove('highlight');

        const bugId = ev.dataTransfer?.getData('text/plain');
        if (!bugId) return;

        const card = document.querySelector(`.card[data-id="${bugId}"]`);
        if (!card) return;

        this.appendChild(card);

        const newStatus = column.id === 'open-column' ? 'open' : 'closed';

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: bugId, status: newStatus }),
            });
        } catch (error) {
            console.error('Ошибка:', error);
            const originalContainer =
                newStatus === 'open'
                    ? closedColumn.querySelector('.cards-container')!
                    : openColumn.querySelector('.cards-container')!;
            originalContainer.appendChild(card);
        }
    });
});

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = (document.getElementById('editId') as HTMLInputElement).value;
    const updatedBug = {
        id,
        title: (document.getElementById('editTitle') as HTMLInputElement).value,
        description: (document.getElementById('editDescription') as HTMLTextAreaElement).value,
        priority: (document.getElementById('editPriority') as HTMLSelectElement).value,
        status: (document.getElementById('editStatus') as HTMLSelectElement).value,
    };

    const res = await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBug),
    });

    if (res.ok) {
        editModal.classList.add('hidden');
        showToast('Тикет обновлён');
        loadBugs();
    } else {
        alert('Ошибка при обновлении тикета');
    }
});

cancelEditBtn.addEventListener('click', () => {
    editModal.classList.add('hidden');
});

loadBugs();
