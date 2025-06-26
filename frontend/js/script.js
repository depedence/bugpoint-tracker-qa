// Данные задач на основе вашего примера
const tasks = {
    todo: [
        {
            title: "Заказать Jupiter Express для путешествий по внешней солнечной системе",
            category: "ПАРТНЕРЫ ПО КОСМОПУТЕШЕСТВИЯМ",
            id: "TIS-25"
        }
    ],
    progress: [
        {
            title: "Запрос доступных рейсов занимает > 5 секунд",
            category: "S1:S9/2G1:2 TU15",
            id: "TIS-8"
        }
    ],
    review: [
        {
            title: "Зарегистрироваться в Министерстве доходов Марса",
            category: "МЕСТНЫЙ ОФИС YAMS",
            id: "TIS-11"
        }
    ],
    done: [
        {
            title: "Футер на главной странице использует inline-стили - нужно использовать класс",
            category: "LYADS+FLAYS UJPSO3",
            id: "TIS-68"
        },
        {
            title: "Создать 90-дневные планы для всех отделов Марсианского офиса",
            category: "МЕСТНЫЙ ОФИС YAMS",
            id: "TIS-12"
        },
        {
            title: "Заказать Saturn Shuttle Lines для групповых туров",
            category: "ПАРТНЕРЫ ПО КОСМОПУТЕШЕСТВИЯМ",
            id: "TIS-16"
        },
        {
            title: "Разработать сетевой план для Марсианского офиса",
            category: "МЕСТНЫЙ ОФИС YAMS",
            id: "TIS-18"
        },
        {
            title: "Сделать Speedy SpaceCraft предпочтительным",
            category: "ПАРТНЕРЫ ПО КОСМОПУТЕШЕСТВИЯМ",
            id: "TIS-17"
        },
        {
            title: "Заказать Saturn Shuttle Lines для групповых туров",
            category: "МЕСТНЫЙ ОФИС YAMS",
            id: "TIS-18"
        },
        {
            title: "Найти поставщика питания для обеспечения едой",
            category: "ПАРТНЕРЫ ПО КОСМОПУТЕШЕСТВИЯМ",
            id: "TIS-19"
        },
        {
            title: "Заказать Saturn Shuttle Lines для групповых туров",
            category: "ПАРТНЕРЫ ПО КОСМОПУТЕШЕСТВИЯМ",
            id: "TIS-20"
        }
    ]
};

// Функция для создания карточки задачи
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.draggable = true; // Делаем карточку перетаскиваемой

    // Добавляем обработчики событий для перетаскивания
    taskCard.addEventListener('dragstart', dragStart);

    // Создаем HTML структуру карточки
    taskCard.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="task-category">${task.category}</div>
        <div class="task-id">${task.id}</div>
    `;

    return taskCard;
}

// Функция для отображения задач в соответствующих колонках
function renderTasks() {
    // Перебираем все статусы задач (todo, progress, review, done)
    for (const status in tasks) {
        const container = document.getElementById(`${status}-tasks`);
        container.innerHTML = ''; // Очищаем контейнер перед добавлением задач

        // Создаем и добавляем карточки для каждой задачи
        tasks[status].forEach(task => {
            const taskCard = createTaskCard(task);
            container.appendChild(taskCard);
        });
    }
}

// Переменная для хранения перетаскиваемой задачи
let draggedTask = null;

// Функция, вызываемая при начале перетаскивания
function dragStart(e) {
    draggedTask = e.target;
    e.dataTransfer.effectAllowed = 'move';
    // Визуальная обратная связь - уменьшаем прозрачность
    e.target.style.opacity = '0.4';
}

// Функция, вызываемая при наведении на область, куда можно перетащить
function dragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Необходимо для возможности "дропа"
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// Функция, вызываемая при входе в область, куда можно перетащить
function dragEnter(e) {
    e.target.classList.add('drag-over'); // Добавляем класс для визуального выделения
}

// Функция, вызываемая при выходе из области, куда можно перетащить
function dragLeave(e) {
    e.target.classList.remove('drag-over'); // Убираем класс выделения
}

// Функция, вызываемая при "дропе" задачи
function drop(e) {
    e.preventDefault();
    e.stopPropagation();

    // Убираем класс выделения у всех контейнеров
    document.querySelectorAll('.tasks-container').forEach(container => {
        container.classList.remove('drag-over');
    });

    // Проверяем, куда мы "дропаем" задачу
    if (e.target.classList.contains('tasks-container')) {
        e.target.appendChild(draggedTask);
    } else if (e.target.closest('.tasks-container')) {
        // Если "дропаем" на другую карточку, вставляем до или после нее
        const container = e.target.closest('.tasks-container');
        const rect = e.target.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        if (e.clientY > midpoint) {
            // Вставляем после, если "дроп" в нижней половине
            container.insertBefore(draggedTask, e.target.nextSibling);
        } else {
            // Вставляем до, если "дроп" в верхней половине
            container.insertBefore(draggedTask, e.target);
        }
    }

    // Восстанавливаем прозрачность
    draggedTask.style.opacity = '1';
    draggedTask = null;
}

// Функция для настройки перетаскивания для всех колонок
function initDragAndDrop() {
    const containers = document.querySelectorAll('.tasks-container');

    containers.forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', drop);
    });
}

// Функция для настройки кнопок фильтрации
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем класс active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем класс active к нажатой кнопке
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Показываем/скрываем колонки в зависимости от фильтра
            document.querySelectorAll('.task-column').forEach(column => {
                if (filter === 'all') {
                    column.style.display = 'block';
                } else {
                    if (column.id.includes(filter)) {
                        column.style.display = 'block';
                    } else {
                        column.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Инициализация дашборда после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    initDragAndDrop();
    setupFilterButtons();
});
