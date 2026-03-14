export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

// OSのダークモード設定を監視するMediaQueryList
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * 現在適用すべき実際のモード（dark or light）を判定する
 */
const getResolvedMode = (theme: Theme): 'dark' | 'light' => {
  if (theme !== 'system') return theme;
  return darkQuery.matches ? 'dark' : 'light';
};

/**
 * DOM（htmlタグ）にクラスを反映し、LocalStorageに保存する
 */
const updateDOM = (theme: Theme) => {
  const mode = getResolvedMode(theme);
  document.documentElement.classList.toggle('dark', mode === 'dark');
};

/**
 * 外部公開：テーマを初期化する（OS設定の監視も開始）
 */
export const initTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme;
  const theme: Theme = (saved === 'light' || saved === 'dark' || saved === 'system') ? saved : 'system';
  
  // OSの設定が変更された時のリスナー
  darkQuery.addEventListener('change', () => {
    if (localStorage.getItem(STORAGE_KEY) === 'system' || !localStorage.getItem(STORAGE_KEY)) {
      updateDOM('system');
    }
  });

  updateDOM(theme);
  return theme;
};

/**
 * 外部公開：テーマを切り替える
 */
export const setTheme = (theme: Theme) => {
  localStorage.setItem(STORAGE_KEY, theme);
  updateDOM(theme);
};

/**
 * 外部公開：現在の設定値を取得する
 */
export const getTheme = (): Theme => {
  return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
};
