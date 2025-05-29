import { levels } from './levels.js';
import { updateLevelUI, updateArrowState, setFlowerPosition } from './ui.js';

export let currentLevelIndex = 0;

export function loadLevel(index) {
  console.log(`loadLevel: Загружаем уровень с индексом ${index}`);
  currentLevelIndex = index;

  const pond = document.getElementById('pond');
  const feedback = document.getElementById('feedback');
  const editor = document.querySelector('.code-editor');
  const tipsList = document.getElementById('tipsList');

  if (!pond || !editor || !feedback || !tipsList) {
    console.error('loadLevel: Не найдены необходимые элементы на стрнице');
    console.log({ pond, editor, feedback, tipsList });
    return;
  }

  feedback.textContent = '';

  const level = levels[index];
  if (!level) {
    console.error('loadLevel: Уровень с таким индексом не найден:', index);
    return;
  }
  console.log('loadLevel: Загружен уровень:', level);

  // --- Редактор кода ---
  let editorHTML = `<div class="editor-line">1 <span>#bee-row {</span></div>`;

  if (level.layout === 'flex') {
    editorHTML += `<div class="editor-line">2 <span>display: flex;</span></div>`;
    editorHTML += `<div class="editor-line">3 <span><input id="userInput" value="${level.defaultCSS.trim()}" placeholder="justify-content: center;" /></span></div>`;
    editorHTML += `<div class="editor-line">4 <span>}</span></div>`;
  } else if (level.layout === 'text-align') {
    editorHTML += `<div class="editor-line">2 <span><input id="userInput" value="${level.defaultCSS.trim()}" placeholder="text-align: center;" /></span></div>`;
    editorHTML += `<div class="editor-line">3 <span>}</span></div>`;
  } else if (level.layout === 'custom') {
  editorHTML += `<div class="editor-line">2 <span><input id="userInput" value="${level.defaultCSS.trim()}" placeholder="margin-left: 60%;" /></span></div>`;
  editorHTML += `<div class="editor-line">3 <span>}</span></div>`;
  } else {
    console.warn('loadLevel: Неизвестный layout уровня:', level.layout);
  } 

  editor.innerHTML = editorHTML;
  console.log('loadLevel: Обновлён редактор кода');

  // Правая панель 
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
  }
  console.log('loadLevel: Обновлён pond.innerHTML');

  pond.setAttribute('data-layout', level.layout);

  // Применяем defaultCSS к #bee-row
  applyStyleToBeeRow(level.layout, level.defaultCSS);

  //Устанавливаем позицию цветка
  setFlowerPosition(level.flowerPosition);

  //Обновляем интерфейс 
  updateLevelUI(index + 1, level.instruction);
  updateArrowState(index, levels.length);
  renderTips(level.tips, tipsList);

  console.log('loadLevel: Уровень загружен полностью');
}

function applyStyleToBeeRow(layout, cssText) {
  const beeRow = document.getElementById('bee-row');
  if (!beeRow) {
    console.error('applyStyleToBeeRow: Элемент #bee-row не найден!');
    return;
  }

  // Сброс стилей
  beeRow.style.cssText = '';

  if (layout === 'flex') {
    beeRow.style.display = 'flex';
    beeRow.style.alignItems = 'center';

    const match = cssText.match(/justify-content:\s*([^;]+);?/);
    if (match) {
      beeRow.style.justifyContent = match[1].trim();
    } else {
      beeRow.style.justifyContent = 'flex-start';
    }
  } else if (layout === 'text-align') {
    // Для text-align юзаем inline-block и text-align через CSS
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
