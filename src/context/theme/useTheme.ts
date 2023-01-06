import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.querySelector('html')?.classList.remove('light', 'dark');
    document.querySelector('html')?.classList.add(`${theme}`);
  }, [theme]);

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    }
  };

  return {
    theme,
    setTheme: changeTheme,
  };
};

export default useTheme;
