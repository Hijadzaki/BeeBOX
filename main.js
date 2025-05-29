import { loadLevel, currentLevelIndex } from './levelManager.js';
import { setupStyleChecker } from './styleChecker.js';
import { setupUI } from './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  loadLevel(currentLevelIndex);
  setupStyleChecker();
  setupUI();
});
