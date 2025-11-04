import React from 'react';
import styles from './ScrollToBottom.module.css';

const ScrollToBottom = ({ onClick, unreadCount = 0 }) => {
  if (unreadCount === 0) return null;

  return (
    <button className={styles.scrollButton} onClick={onClick}>
      <span className={styles.arrow}>↓</span>
      {unreadCount > 0 && (
        <span className={styles.unreadBadge}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
      <span className={styles.tooltip}>Новые сообщения</span>
    </button>
  );
};

export default ScrollToBottom;