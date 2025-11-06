import React from 'react';
import ChatWindow from '../../components/chat/ChatWindow/ChatWindow';
import Icon from '../../components/common/Icon/Icon';
import styles from './ChatPage.module.css';

const ChatPage = ({ group, onBack }) => {
  return (
    <div className={styles.chatPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <Icon name="ArrowBigLeft" size={16} />
          Назад к группам
        </button>
        <div className={styles.groupInfo}>
          <h2>Чат группы: {group.title}</h2>
          <p>{group.description}</p>
        </div>
      </div>
      
      <div className={styles.chatContainer}>
        <ChatWindow 
          currentChat={group.chat}
          currentUser={{ id: 1, username: 'student123', fullname: 'Иван Иванов', role: 'student' }}
        />
      </div>
    </div>
  );
};

export default ChatPage;