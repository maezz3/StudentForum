// components/common/ThemeToggle/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Icon from '../Icon/Icon';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      title={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
    >
      <Icon 
        name={isDark ? "Sun" : "Moon"} 
        size={20} 
        color={isDark ? "#fbbf24" : "#6b7280"} 
      />
    </button>
  );
};

export default ThemeToggle;