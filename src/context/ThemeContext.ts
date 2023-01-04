import { createContext } from 'react';

export type validTheme = 'dark' | 'light';
export const ThemeContext = createContext<validTheme>('dark');
