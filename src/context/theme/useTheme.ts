import { useState } from 'react';
import { validTheme } from './ThemeContext';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<validTheme>('dark');

  const changeTheme = () => {
    if (currentTheme === 'dark') setCurrentTheme('light');
    else if (currentTheme === 'light') setCurrentTheme('dark');
  };

  return {
    currentTheme,
    changeTheme,
  };
};

export default useTheme;
