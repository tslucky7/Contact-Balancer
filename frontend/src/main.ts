import './style.css';

import { toConfirmHandler } from './features/inquiry/handlers/toConfirmHandler';
import { dom } from './features/inquiry/state/context';
import { routeHandler } from './features/inquiry/handlers/routeHandler';
import { initTheme, setTheme } from './theme';
import type { Theme } from './theme';

// 1. 最初にテーマを初期化（DOM構築前に実行されるのが理想）
const currentTheme = initTheme();
// 2. UI（セレクトボックス等）がある場合の同期
const themeSelect = document.getElementById('theme-select') as HTMLSelectElement | null;
if (themeSelect) {
  themeSelect.value = currentTheme;
  themeSelect.addEventListener('change', (e) => {
    setTheme((e.target as HTMLSelectElement).value as Theme);
  });
}

// ルートを処理する
window.addEventListener('load', routeHandler);
dom.toConfirmButton.addEventListener('click', toConfirmHandler);
