import React, { useState, useEffect } from 'react';
import { useChat } from '../../../hooks/useChat';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import styles from './ChatWindow.module.css';

const ChatWindow = ({ currentChat, currentUser }) => {
  const { 
    messages, 
    loading, 
    error, 
    sendMessage, 
    hasMore, 
    loadMore 
  } = useChat(currentChat?.id);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleSendMessage = async (text) => {
    try {
      await sendMessage(text);
      // WebSocket или polling для получения новых сообщений от других пользователей
      // будет реализовано при подключении бэкенда
    } catch (err) {
      console.error('Failed to send message:', err);
      // Показываем уведомление об ошибке
      alert('Не удалось отправить сообщение');
    }
  };

  const handleScroll = (isBottom) => {
    setIsAtBottom(isBottom);
  };

  if (error) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Ошибка загрузки чата</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Перезагрузить страницу
        </button>
      </div>
    );
  }

  if (!currentChat) {
    return (
      <div className={styles.noChatSelected}>
        <div className={styles.noChatIcon}>💭</div>
        <h3>Выберите чат</h3>
        <p>Выберите чат из списка чтобы начать общение</p>
      </div>
    );
  }

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <div className={styles.chatInfo}>
          <h3 className={styles.chatTitle}>{currentChat.title || 'Чат группы'}</h3>
          <span className={styles.chatStatus}>
            {loading ? 'Загрузка...' : `${messages.length} сообщений`}
          </span>
        </div>
        <div className={styles.chatActions}>
          <button className={styles.actionButton} title="Участники">👥</button>
          <button className={styles.actionButton} title="Настройки">⚙️</button>
        </div>
      </div>
      
      <MessageList 
        messages={messages} 
        currentUser={currentUser}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onScroll={handleScroll}
      />
      
      {/* Будет подключено когда появится WebSocket */}
      {/* <TypingIndicator users={[]} /> */}
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={loading}
      />
    </div>
  );
};

export default ChatWindow;