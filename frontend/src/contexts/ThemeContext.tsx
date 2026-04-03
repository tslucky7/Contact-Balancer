import { createContext } from 'react';
import type { Theme } from '../features/theme/theme.types';
import { getSavedTheme } from '../features/theme/theme.runtime';
import { useThemeLogic } from '../hooks/useTheme';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: getSavedTheme(),
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeLogic();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
