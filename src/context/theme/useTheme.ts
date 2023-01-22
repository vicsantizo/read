import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.querySelector('html')?.classList.add(`${theme}`);

    return () => {
      document.querySelector('html')?.classList.remove(`${theme}`);
    };
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
