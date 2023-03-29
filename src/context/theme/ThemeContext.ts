import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export type validTheme = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<validTheme>({
  theme: 'dark',
  setTheme: (theme: Theme) => {
    //
  },
});
