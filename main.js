import { loadLevel } from './levelManager.js';
import { setupStyleChecker } from './styleChecker.js';
import { setupUI } from './ui.js';
import { levels } from './levels.js';
import { initMenu } from './menu.js';

window.addEventListener('DOMContentLoaded', () => {
  setupStyleChecker();
  setupUI();
  initMenu({ loadLevel, levels });
});
