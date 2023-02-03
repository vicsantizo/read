import { useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { setDarkModeCookie } from '../../utils/cookies';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark', 'light');
    document.querySelector('html')?.classList.add(`${theme}`);
  }, [theme]);

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      setDarkModeCookie(false);
    } else if (theme === 'light') {
      setTheme('dark');
      setDarkModeCookie(true);
    }
  };

  return {
    theme,
    setTheme: changeTheme,
  };
};

export default useTheme;
