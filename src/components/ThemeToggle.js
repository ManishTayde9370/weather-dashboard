import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;