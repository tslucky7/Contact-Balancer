import type { Theme } from './theme.types';

export const STORAGE_KEY = 'theme';

export const getDarkQuery = () =>
  window.matchMedia('(prefers-color-scheme: dark)');
export const getSavedTheme = () => localStorage.getItem(STORAGE_KEY) as Theme;

/**
 * 現在適用すべき実際のモード（dark or light）を判定する
 */
const getResolvedMode = (theme: Theme) => {
  if (theme !== 'system') return theme;
  return getDarkQuery().matches ? 'dark' : 'light';
};

/**
 * DOM（htmlタグ）にクラスを反映し、LocalStorageに保存する
 */
export const updateDOM = (theme: Theme) => {
  const mode = getResolvedMode(theme);
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem(STORAGE_KEY, theme);
};
