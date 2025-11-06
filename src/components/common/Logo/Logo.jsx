// components/common/Logo/Logo.jsx
import React from 'react';
import styles from './Logo.module.css';

const Logo = ({ 
  size = 32, 
  withText = true, 
  variant = 'default' // 'default' | 'white' | 'minimal'
}) => {
  const getLogoColor = () => {
    switch (variant) {
      case 'white': return '#ffffff';
      case 'minimal': return 'var(--primary-500)';
      default: return 'var(--primary-500)';
    }
  };

  return (
    <div className={styles.logo}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.logoSvg}
      >
        {/* Академическое здание */}
        <path 
          d="M16 2L4 8V24L16 30L28 24V8L16 2Z" 
          fill="none"
          stroke="white"
          strokeWidth="3" // Толстая белая обводка
        />
        
        {/* Внутренняя цветная обводка */}
        <path 
          d="M16 2L4 8V24L16 30L28 24V8L16 2Z" 
          fill={getLogoColor()}
          fillOpacity={variant === 'minimal' ? 0.1 : 1}
        />
        
        {/* Окна */}
        <rect x="12" y="10" width="2" height="2" fill="white"/>
        <rect x="18" y="10" width="2" height="2" fill="white"/>
        <rect x="12" y="14" width="2" height="2" fill="white"/>
        <rect x="18" y="14" width="2" height="2" fill="white"/>
        
        {/* Дверь */}
        <rect x="14" y="18" width="4" height="6" fill="white"/>
        
        {/* Крыша */}
        <path d="M4 8L16 2L28 8" stroke="black" strokeWidth="1"/>
      </svg>
      
      {withText && (
        <span className={styles.logoText}>
          Студенческий форум
        </span>
      )}
    </div>
  );
};

export default Logo;