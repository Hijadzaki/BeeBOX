import { levels } from './levels.js';

export function updateLevelUI(levelNumber, instruction) {
  const levelIndicator = document.getElementById('levelIndicator');
  const instructionElement = document.querySelector('p'); // Первый параграф в левой панели

  if (!levelIndicator) {
    console.error('Element with id "levelIndicator" not found!');
    return;
  }

  levelIndicator.textContent = `Уровень ${levelNumber} из ${levels.length}`;




  if (instructionElement) {
    instructionElement.textContent = instruction || '';
  }
}

export function updateArrowState(currentIndex, levelsCount) {
  const prevBtn = document.getElementById('prevLevel');
  const nextBtn = document.getElementById('nextLevel');

  if (!prevBtn || !nextBtn) {
    console.error('Arrow buttons not found!');
    return;
  }

  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex >= levelsCount - 1;
}

export function setupUI() {
  const prevBtn = document.getElementById('prevLevel');
  const nextBtn = document.getElementById('nextLevel');

  prevBtn.addEventListener('click', () => {
    import('./levelManager.js').then(module => {
      module.goToPreviousLevel();
    });
  });

  nextBtn.addEventListener('click', () => {
    import('./levelManager.js').then(module => {
      module.goToNextLevel();
    });
  });
}

export function setFlowerPosition(position) {
  const flower = document.querySelector('.flower');
  if (!flower) {
    console.warn('Цветок не найден!');
    return;
  }

  // Сброс стилей и классов
  flower.style.left = '';
  flower.style.right = '';
  flower.style.transform = '';
  flower.classList.remove('center-right');

  switch (position) {
    case 'left':
      flower.style.left = '0';
      flower.style.transform = 'translateY(-50%)';
      break;
    case 'center':
      flower.style.left = '50%';
      flower.style.transform = 'translate(-50%, -50%)';
      break;
    case 'right':
      flower.style.right = '0';
      flower.style.transform = 'translateY(-50%)';
      break;
    case 'center-right':
      flower.style.left = '70%';
      flower.style.transform = 'translate(-50%, -50%)';
      break;
    default:
      console.warn(`Неизвестная позиция цветка: "${position}"`);
  }
}


