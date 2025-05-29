import { getCurrentLevel } from './levelManager.js';

export function setupStyleChecker() {
  const button = document.getElementById('checkButton');
  button.addEventListener('click', applyStyle);
}

export function applyStyle() {
  const input = document.getElementById('userInput').value.trim();
  const beeRow = document.getElementById('bee-row');
  const bee = document.querySelector('.bee');
  const flower = document.querySelector('.flower');
  const feedback = document.getElementById('feedback');
  const level = getCurrentLevel();

  if (!beeRow || !bee || !flower || !feedback) {
    console.error('Не найдены необходимые элементы для проверки!');
    return;
  }

  try {
    // Сброс стилей
    beeRow.style.cssText = '';

    // Если layout flex — выставляем display flex
    if (level.layout === 'flex') {
      beeRow.style.display = 'flex';
    }

    // Разбираем введённый CSS и применяем свойства
    const rules = input.split(';').map(rule => rule.trim()).filter(Boolean);
    rules.forEach(rule => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        // Преобразуем CSS-свойство из kebab-case в camelCase
        const jsProperty = property.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        beeRow.style[jsProperty] = value;
      }
    });

    requestAnimationFrame(() => {
      const beeBox = bee.getBoundingClientRect();
      const flowerBox = flower.getBoundingClientRect();

      const beeCenter = beeBox.left + beeBox.width / 2;
      const flowerCenter = flowerBox.left + flowerBox.width / 2;
      const distance = Math.abs(beeCenter - flowerCenter);

      if (distance < 10) {
        feedback.textContent = level.feedback;
        feedback.style.color = 'green';
      } else {
        feedback.textContent = 'Почти! Пчелка не села точно на цветок.';
        feedback.style.color = 'orange';
      }
    });
  } catch {
    feedback.textContent = 'Ошибка в CSS!';
    feedback.style.color = 'red';
  }
}
