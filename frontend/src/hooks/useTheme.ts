import { useContext, useState, useEffect } from 'react';
import type { Theme } from '../features/theme/theme.types';
import {
  getDarkQuery,
  getSavedTheme,
  updateDOM,
} from '../features/theme/theme.runtime';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeはThemeProvider配下で使ってください');
  return ctx;
};

export const useThemeLogic = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return getSavedTheme();
  });

  const listener = () => {
    if (theme === 'system') updateDOM(theme);
  };

  useEffect(() => {
    updateDOM(theme);
    getDarkQuery().addEventListener('change', listener);

    return () => {
      getDarkQuery().removeEventListener('change', listener);
    };
  }, [theme]);

  return { theme, setTheme };
};
