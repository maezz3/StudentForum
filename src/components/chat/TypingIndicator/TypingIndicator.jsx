import React from 'react';
import styles from './TypingIndicator.module.css';

const TypingIndicator = ({ users = [] }) => {
  if (users.length === 0) return null;

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0]} печатает...`;
    } else if (users.length === 2) {
      return `${users[0]} и ${users[1]} печатают...`;
    } else {
      return `${users[0]} и еще ${users.length - 1} печатают...`;
    }
  };

  return (
    <div className={styles.typingIndicator}>
      <div className={styles.typingDots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className={styles.typingText}>{getTypingText()}</span>
    </div>
  );
};

export default TypingIndicator;