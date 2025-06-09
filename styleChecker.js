// styleChecker.js

import { getCurrentLevel } from './levelManager.js';
import { applyStyleToBeeRow } from './levelManager.js';

export function setupStyleChecker() {
  const button = document.getElementById('checkButton');
  if (!button) {
    console.error('Кнопка Проверить не найдена');
    return;
  }
  button.addEventListener('click', applyStyle);
}

function getSelectedElements(selector) {
  if (!selector.trim()) return [];
  try {
    return Array.from(document.querySelectorAll(selector));
  } catch {
    console.error(`Неверный селектор "${selector}"`);
    return [];
  }
}

export function applyStyle() {
  const level = getCurrentLevel();
  const feedback = document.getElementById('feedback');
  if (!feedback) {
    console.error('Элемент feedback не найден');
    return;
  }

  // ---------- selector-targeting ----------
  if (level.layout === 'selector-targeting') {
    const selector = document.getElementById('userSelector')?.value.trim() || '';
    const cssText = document.getElementById('userInput')?.value.trim() || '';

    if (!selector) {
      feedback.textContent = 'Введите CSS-селектор!';
      feedback.style.color = 'red';
      return;
    }

    const bees = getSelectedElements(selector);
    if (bees.length === 0) {
      feedback.textContent = 'По селектору ничего не найдено.';
      feedback.style.color = 'orange';
      return;
    }

    // Парсим CSS и применяем
    const rules = cssText
      .split(';')
      .map(r => r.trim())
      .filter(Boolean)
      .map(rule => rule.split(':').map(s => s.trim()));

    bees.forEach(bee => {
      const computedPos = window.getComputedStyle(bee).position;
      if (!computedPos || computedPos === 'static') {
        bee.style.position = 'relative';
        console.log('Установлен position: relative для элемента', bee);
      }
      rules.forEach(([prop, val]) => {
        if (prop && val) {
          const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          bee.style[jsProp] = val;
          console.log(`Применяем стиль: ${prop} = ${val} к элементу`, bee);
        }
      });
    });

    // Проверка попадания
    requestAnimationFrame(() => {
      let bee, flower;

      if (level.targetBeeColor) {
        bee = document.querySelector(`.bee.${level.targetBeeColor}`);
        flower = document.querySelector(`.flower.${level.targetBeeColor}`);
      } else {
        bee = bees[0];
        flower = document.querySelector('.flower');
      }

      if (!bee || !flower) {
        feedback.textContent = `Не найдены ${level.targetBeeColor ? `пчела или цветок цвета ${level.targetBeeColor}` : 'пчела или цветок'}!`;
        feedback.style.color = 'red';
        return;
      }

      const b = bee.getBoundingClientRect();
      const f = flower.getBoundingClientRect();
      const dist = Math.abs((b.left + b.width / 2) - (f.left + f.width / 2));

      console.log({ selector, rules, bee, flower, dist });

      if (dist < 20) {
        feedback.textContent = level.feedback;
        feedback.style.color = 'green';
      } else {
        feedback.textContent = 'Почти! Пчёлка не села точно на цветок.';
        feedback.style.color = 'orange';
      }
    });

    return;
  }

  // ---------- другие layout ----------
  const cssText = document.getElementById('userInput')?.value.trim() || '';
  applyStyleToBeeRow(level.layout, cssText);

  const beeRow = document.getElementById('bee-row');
  if (!beeRow) {
    console.error('Элемент bee-row не найден для этого уровня');
    return;
  }

  beeRow.style.cssText = '';
  if (level.layout === 'flex') {
    beeRow.style.display = 'flex';
  }

  cssText
    .split(';')
    .map(r => r.trim())
    .filter(Boolean)
    .forEach(rule => {
      const [prop, val] = rule.split(':').map(s => s.trim());
      if (prop && val) {
        const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        beeRow.style[jsProp] = val;
      }
    });

  const bee = document.querySelector('.bee');
  const flower = document.querySelector('.flower');
  if (!bee || !flower) {
    feedback.textContent = 'Не найдены .bee или .flower!';
    feedback.style.color = 'red';
    return;
  }

  requestAnimationFrame(() => {
    const b = bee.getBoundingClientRect();
    const f = flower.getBoundingClientRect();
    const dist = Math.abs((b.left + b.width / 2) - (f.left + f.width / 2));

    if (dist < 20) {
      feedback.textContent = level.feedback;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = 'Почти! Пчелка не села точно на цветок.';
      feedback.style.color = 'orange';
    }
  });
}
