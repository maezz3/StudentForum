import React, { useState } from 'react';
import styles from './AnnouncementCard.module.css';

const AnnouncementCard = ({ announcement, currentUser, onDelete, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Сегодня в ${date.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else if (diffDays === 1) {
      return `Вчера в ${date.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: 'Важное',
      medium: 'Обычное', 
      low: 'Информационное'
    };
    return labels[priority] || priority;
  };

  const canManage = currentUser.role === 'teacher' || currentUser.id === announcement.author.id;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const content = announcement.content;
  const shouldTruncate = content.length > 150;
  const displayContent = isExpanded || !shouldTruncate ? content : content.slice(0, 150) + '...';

  return (
    <div 
      className={`${styles.card} ${announcement.is_pinned ? styles.pinned : ''}`}
      style={{ borderLeftColor: announcement.color }}
    >
      {/* Заголовок и мета-информация */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{announcement.title}</h3>
          <div className={styles.meta}>
            <span 
              className={styles.priority}
              style={{ backgroundColor: announcement.color }}
            >
              {getPriorityLabel(announcement.priority)}
            </span>
            <span className={styles.date}>{formatDate(announcement.created_at)}</span>
          </div>
        </div>
        
        <div className={styles.actions}>
          {canManage && (
            <>
              <button 
                className={styles.pinButton}
                onClick={() => onTogglePin(announcement.id)}
                title={announcement.is_pinned ? 'Открепить' : 'Закрепить'}
              >
                {announcement.is_pinned ? '📌' : '📍'}
              </button>
              <button 
                className={styles.deleteButton}
                onClick={() => onDelete(announcement.id)}
                title="Удалить"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>

      {/* Содержимое объявления */}
      <div className={styles.content}>
        <p className={styles.text}>{displayContent}</p>
        {shouldTruncate && (
          <button 
            className={styles.expandButton}
            onClick={toggleExpand}
          >
            {isExpanded ? 'Свернуть' : 'Читать полностью'}
          </button>
        )}
      </div>

      {/* Автор */}
      <div className={styles.footer}>
        <div className={styles.author}>
          <div className={styles.avatar}>
            {announcement.author.fullname.charAt(0)}
          </div>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{announcement.author.fullname}</span>
            <span className={styles.authorRole}>
              {announcement.author.role === 'teacher' ? 'Преподаватель' : 'Студент'}
            </span>
          </div>
        </div>
      </div>

      {/* Индикатор закрепления */}
      {announcement.is_pinned && (
        <div className={styles.pinIndicator}>
          📌 Закреплено
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;