import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('system'); 

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'system';
    setMode(savedMode);
    applyTheme(savedMode);

    if (savedMode === 'system') {
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemListener = (e) => applyTheme('system');
      mediaQuery.addEventListener('change', systemListener);
      return () => mediaQuery.removeEventListener('change', systemListener);
    }
  }, []);

  const applyTheme = (mode) => {
    let isDark = false;

    if (mode === 'dark') isDark = true;
    else if (mode === 'light') isDark = false;
    else isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    document.documentElement.classList.toggle('dark', isDark);
  };

  const changeTheme = (newMode) => {
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    applyTheme(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
