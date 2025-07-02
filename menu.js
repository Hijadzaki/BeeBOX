export function initMenu({ loadLevel, levels }) {
  const menu = document.getElementById('menu');
  const container = document.querySelector('.container');
  const levelSelect = document.getElementById('levelSelect');
  const levelsList = document.getElementById('levelsList');

  const hideAll = () => {
    menu.classList.add('hidden');
    levelSelect.classList.add('hidden');
    levelSelect.style.display = 'none';
    container.classList.remove('hidden');
  };

  document.getElementById('playBtn').addEventListener('click', () => {
    hideAll();
    loadLevel(0);
  });

  document.getElementById('levelsBtn').addEventListener('click', () => {
    levelsList.innerHTML = '';
    levels.forEach((lvl, idx) => {
      const li = document.createElement('li');
      li.textContent = `Уровень ${idx + 1} (${lvl.layout})`;
      li.addEventListener('click', () => {
        hideAll();
        loadLevel(idx);
      });
      levelsList.appendChild(li);
    });
    levelSelect.classList.remove('hidden');
    levelSelect.style.display = 'flex';
  });

  document.getElementById('closeLevelSelect').addEventListener('click', () => {
    levelSelect.classList.add('hidden');
    levelSelect.style.display = 'none';
  });

  document.getElementById('exitBtn').addEventListener('click', () => {
    window.close();
    window.location.href = 'about:blank';
  });
}
