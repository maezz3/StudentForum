import React, { useEffect, useRef } from 'react';
import MessageItem from '../MessageItem/MessageItem';
import styles from './MessageList.module.css';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);

  // Добавляем флаги для отображения дат
  const messagesWithDates = messages.map((message, index) => {
    const previousMessage = messages[index - 1];
    return {
      ...message,
      showDate: isNewDay(message, previousMessage)
    };
  });

  function isNewDay(currentMsg, previousMsg) {
    if (!previousMsg) return true;
    const currentDate = new Date(currentMsg.datetime).toDateString();
    const previousDate = new Date(previousMsg.datetime).toDateString();
    return currentDate !== previousDate;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messageList} ref={listRef}>
      {messagesWithDates.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <h3>Нет сообщений</h3>
          <p>Начните общение - отправьте первое сообщение!</p>
        </div>
      ) : (
        <>
          <div className={styles.messagesContainer}>
            {messagesWithDates.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isOwn={message.sender.id === currentUser.id}
                currentUser={currentUser}
              />
            ))}
          </div>
          <div ref={messagesEndRef} className={styles.scrollAnchor} />
        </>
      )}
    </div>
  );
};

export default MessageList;