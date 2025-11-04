import React from 'react';
import * as Icons from 'lucide-react';
import styles from './Icon.module.css';

const Icon = ({ 
  name, 
  size = 20, 
  color = 'currentColor', 
  strokeWidth = 2,
  className = '',
  ...props 
}) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span 
      className={`${styles.icon} ${className}`}
      style={{ 
        width: size, 
        height: size,
        color: color,
      }}
      {...props}
    >
      <IconComponent 
        size={size} 
        color={color}
        strokeWidth={strokeWidth}
      />
    </span>
  );
};

export default Icon;