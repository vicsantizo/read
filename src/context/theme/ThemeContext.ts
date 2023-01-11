import { createContext } from 'react';

export type validTheme = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<validTheme>({
  theme: 'dark',
  setTheme: (theme: string) => {
    //
  },
});
