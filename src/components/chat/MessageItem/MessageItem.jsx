import React, { useState } from 'react';
import styles from './MessageItem.module.css';

const MessageItem = ({ message, isOwn, currentUser }) => {
  const [showTime, setShowTime] = useState(false);

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isNewDay = (currentMsg, previousMsg) => {
    if (!previousMsg) return true;
    const currentDate = new Date(currentMsg.datetime).toDateString();
    const previousDate = new Date(previousMsg.datetime).toDateString();
    return currentDate !== previousDate;
  };

  const getInitials = (fullname) => {
    return fullname
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <>
      {/* Разделитель даты */}
      {message.showDate && (
        <div className={styles.dateDivider}>
          <span>{formatDate(message.datetime)}</span>
        </div>
      )}
      
      <div 
        className={`${styles.message} ${isOwn ? styles.ownMessage : styles.otherMessage}`}
        onMouseEnter={() => setShowTime(true)}
        onMouseLeave={() => setShowTime(false)}
      >
        {!isOwn && (
          <div className={styles.avatar}>
            <div className={styles.avatarCircle}>
              {getInitials(message.sender.fullname)}
            </div>
            <div className={`${styles.status} ${styles[message.sender.status]}`} />
          </div>
        )}
        
        <div className={styles.content}>
          {!isOwn && (
            <div className={styles.senderInfo}>
              <span className={styles.senderName}>{message.sender.fullname}</span>
              {message.sender.role === 'teacher' && (
                <span className={styles.teacherBadge}>Преподаватель</span>
              )}
              <span className={styles.messageTime}>
                {formatTime(message.datetime)}
              </span>
            </div>
          )}
          
          <div className={styles.bubble}>
            <p className={styles.text}>{message.text}</p>
            
            {/* Время сообщения (показывается при hover) */}
            {(showTime || isOwn) && (
              <div className={styles.messageMeta}>
                <span className={styles.time}>
                  {formatTime(message.datetime)}
                </span>
                {message.isEdited && (
                  <span className={styles.edited}>(ред.)</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageItem;