import { levels } from './levels.js';
import { updateLevelUI, updateArrowState, setFlowerPosition } from './ui.js';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export let currentLevelIndex = 0;

export function loadLevel(index) {
  console.log(`loadLevel: Загружаем уровень с индексом ${index}`);
  currentLevelIndex = index;

  const pond = document.getElementById('pond');
  const feedback = document.getElementById('feedback');
  const editor = document.querySelector('.code-editor');
  const tipsList = document.getElementById('tipsList');

  if (!pond || !editor || !feedback || !tipsList) {
    console.error('loadLevel: Не найдены необходимые элементы на странице', { pond, editor, feedback, tipsList });
    return;
  }

  feedback.textContent = '';

  const level = levels[index];
  if (!level) {
    console.error('loadLevel: Уровень с таким индексом не найден:', index);
    return;
  }

  console.log('loadLevel: Загружен уровень:', level);

  pond.classList.remove('wide');

  let editorHTML = '';
  let lineNumber = 1;

  // #bee-row только если это не selector-targeting
  if (level.layout !== 'selector-targeting') {
    editorHTML += `<div class="editor-line">${lineNumber++} <span>#bee-row {</span></div>`;
  }

  if (level.layout === 'flex') {
    editorHTML += `<div class="editor-line">${lineNumber++} <span>display: flex;</span></div>`;
    editorHTML += `<div class="editor-line">${lineNumber++} <span><input id="userInput" value="${level.defaultCSS.trim()}" placeholder="justify-content: center;" /></span></div>`;
    editorHTML += `<div class="editor-line">${lineNumber++} <span>}</span></div>`;

  } else if (level.layout === 'text-align') {
    editorHTML += `<div class="editor-line">${lineNumber++} <span><input id="userInput" value="${level.defaultCSS.trim()}" placeholder="text-align: center;" /></span></div>`;
    editorHTML += `<div class="editor-line">${lineNumber++} <span>}</span></div>`;

  } else if (level.layout === 'custom') {
    editorHTML += `<div class="editor-line">${lineNumber++} <span><input id="userInput" value="${level.defaultCSS.trim()}" placeholder="margin-left: 60%;" /></span></div>`;
    editorHTML += `<div class="editor-line">${lineNumber++} <span>}</span></div>`;

  } else if (level.layout === 'selector-targeting') {
    editorHTML += `<div class="editor-line">${lineNumber++} <span><input id="userSelector" placeholder=".bee.red" /></span></div>`;
    editorHTML += `<div class="editor-line">${lineNumber++} <span>{ <input id="userInput" placeholder="justify-content: flex-end;" /> }</span></div>`;

  } else {
    console.warn('loadLevel: Неизвестный layout уровня:', level.layout);
  }
    

  editor.innerHTML = editorHTML;
  console.log('loadLevel: Обновлён редактор кода');

  
  if (level.layout === 'flex') {
    pond.innerHTML = `
      <img src="img/FlowerYellow.png" alt="Цветок" class="flower" />
      <div id="bee-row">
        <img src="img/BeeYellow.png" alt="Пчелка" class="bee" />
      </div>
    `;
  } else if (level.layout === 'text-align') {
    pond.innerHTML = `
      <div id="bee-row">
        <img src="img/BeeYellow.png" alt="Пчелка" class="bee" />
      </div>
      <img src="img/FlowerYellow.png" alt="Цветок" class="flower" />
    `;
  } else if (level.layout === 'selector-targeting') {
  const beeItems = level.beeColors?.map(color =>
    `<img src="img/Bee${capitalize(color)}.png" class="insect bee ${color}" />`
  ).join('') || '';

  const flowerItems = level.flowerColors?.map(color =>
    `<img src="img/Flower${capitalize(color)}.png" class="flower ${color}" />`
  ).join('') || '';

  pond.innerHTML = `
    <div class="selector-container">
      <div class="insect-column" style="align-items: ${level.beeColumnAlign || 'center'};">
        ${beeItems}
      </div>
      <div class="flower-column" style="align-items: ${level.flowerColumnAlign || 'center'};">
        ${flowerItems}
      </div>
    </div>
  `;


    if (level.widePond) {
      pond.classList.add('wide');
    } else {
      pond.classList.remove('wide');
    }
  }

  console.log('loadLevel: Обновлён pond.innerHTML');

  pond.setAttribute('data-layout', level.layout);

  // Применяем стили
  applyStyleToBeeRow(level.layout, level.defaultCSS);

  // Позиция цветка (для других layout ов)
  setFlowerPosition(level.flowerPosition);

  // Обновление UI
  updateLevelUI(index + 1, level.instruction);
  updateArrowState(index, levels.length);
  renderTips(level.tips, tipsList);

  console.log('loadLevel: Уровень загружен полностью');
}

export function applyStyleToBeeRow(layout, cssText) {
  if (layout === 'selector-targeting') {
    const selectorInput = document.getElementById('userSelector');
    if (!selectorInput) return;
    const selector = selectorInput.value.trim();
    if (!selector) return; // пустой селектор — ничего не делаем
    try {
      const selectedInsects = document.querySelectorAll(selector);
      selectedInsects.forEach(el => {
        el.style.marginLeft = 'auto';
        el.style.marginRight = '0';
        el.style.display = 'block';
        
      });
    } catch (e) {
      console.warn('Неверный селектор:', selector);
    }
    return; // Не ищем и не трогаем #bee-row для этого уровня
  }

  const beeRow = document.getElementById('bee-row');
  if (!beeRow) {
    console.error('applyStyleToBeeRow: Элемент #bee-row не найден!');
    return;
  }

  beeRow.style.cssText = '';

  if (layout === 'flex') {
    beeRow.style.display = 'flex';
    beeRow.style.alignItems = 'center';

    const match = cssText.match(/justify-content:\s*([^;]+);?/);
    beeRow.style.justifyContent = match ? match[1].trim() : 'flex-start';
  } else if (layout === 'text-align') {
    beeRow.style.display = 'inline-block';
    beeRow.style.width = '100%';
    beeRow.style.textAlign = 'center';
  } else if (layout === 'custom') {
    beeRow.style.display = 'block';
    const match = cssText.match(/(margin-left|padding-left):\s*([^;]+);?/);
    if (match) {
      beeRow.style[match[1]] = match[2].trim();
    }
  }
}



function renderTips(tips, container) {
  container.innerHTML = '';

  if (!tips || tips.length === 0) {
    container.innerHTML = '<li>Подсказки отсутствуют.</li>';
    return;
  }

  tips.forEach(({ code, description }) => {
    const li = document.createElement('li');
    li.innerHTML = `<code>${code}</code>: ${description}`;
    container.appendChild(li);
  });
}

export function goToNextLevel() {
  if (currentLevelIndex < levels.length - 1) {
    loadLevel(currentLevelIndex + 1);
  }
}

export function goToPreviousLevel() {
  if (currentLevelIndex > 0) {
    loadLevel(currentLevelIndex - 1);
  }
}

export function getCurrentLevel() {
  return levels[currentLevelIndex];
}
