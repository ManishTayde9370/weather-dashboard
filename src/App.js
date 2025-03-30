import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AppContent from './AppContent';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;