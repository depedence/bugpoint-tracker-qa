// Пример реализации
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.bug-card');

  cards.forEach(card => {
    card.addEventListener('dragstart', () => {
      card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  // Логика для зон drop
});
