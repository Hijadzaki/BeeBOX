import { levels } from './levels.js';
import { updateLevelUI, updateArrowState, setFlowerPosition } from './ui.js';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mapAlign(value) {
  switch ((value || '').toLowerCase()) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'flex-start':
    case 'flex-end':
    case 'center':
      return value;
    default:
      return 'center';
  }
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
  // ОЧИСТКА pond перед новой загрузкой
  pond.innerHTML = '';
  pond.className = ''; // сброс всех классов, включая wide
  pond.removeAttribute('data-layout');
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
    editorHTML += `<div class="editor-line">${lineNumber++} <span><input id="userSelector" placeholder=".bee.color" /></span></div>`;
    editorHTML += `<div class="editor-line">${lineNumber++} <span>{ <input id="userInput" placeholder="left: ;" /> }</span></div>`;

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
} else if (level.layout === 'custom') {
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

  const beeColAlign = mapAlign(level.beeColumnAlign || 'center');
  const flowerColAlign = mapAlign(level.flowerColumnAlign || 'center');

  pond.innerHTML = `
    <div class="selector-container">
      <div class="insect-column" style="align-items: ${beeColAlign};">
        ${beeItems}
      </div>
      <div class="flower-column" style="align-items: ${flowerColAlign};">
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

  // Устанавливаем горизонтальное выравнивание пчёлок и цветков по цвету, если заданы
  applyEntityAlignments(level);

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
    beeRow.style.height = '100%';
    beeRow.style.position = 'relative';
    beeRow.style.top = '50%';
    beeRow.style.transform = 'translateY(-50%)';
    beeRow.style.textAlign = 'center';
  } else if (layout === 'custom') {
    beeRow.style.display = 'block';
    beeRow.style.position = 'relative';
    beeRow.style.top = '50%';
    beeRow.style.transform = 'translateY(-50%)';
    const match = cssText.match(/(margin-left|padding-left):\s*([^;]+);?/);
    if (match) {
      beeRow.style[match[1]] = match[2].trim();
    }
  }
}

// Устанавливает горизонтальное выравнивание пчёл и цветков по цвету
function applyEntityAlignments(level) {
  const setAlign = (selectorBase, alignMap) => {
    Object.entries(alignMap).forEach(([color, align]) => {
      const el = document.querySelector(`${selectorBase}.${color}`);
      if (!el) return;

      el.style.alignSelf = '';
      el.style.marginLeft = '';
      el.style.marginRight = '';
      el.style.left = '';
      el.style.right = '';

      switch (align) {
        case 'left':
          el.style.alignSelf = 'flex-start';
          break;
        case 'center':
          el.style.alignSelf = 'center';
          break;
        case 'right':
          el.style.alignSelf = 'flex-end';
          break;
        case 'flex-start':
          el.style.alignSelf = 'flex-start';
          break;
        case 'flex-end':
          el.style.alignSelf = 'flex-end';
          break;
        default:
          console.warn(`Неизвестное выравнивание "${align}" для ${selectorBase}.${color}`);
      }
    });
  };

  if (level.beeAlign) {
    setAlign('.bee', level.beeAlign);
  }

  if (level.flowerAlign) {
    setAlign('.flower', level.flowerAlign);
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
