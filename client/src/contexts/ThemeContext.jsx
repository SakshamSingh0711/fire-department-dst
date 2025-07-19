import React, { createContext, useState, useContext } from 'react';
import { darkTheme, lightTheme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    if (themeMode === 'dark') {
      setTheme(lightTheme);
      setThemeMode('light');
    } else {
      setTheme(darkTheme);
      setThemeMode('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};