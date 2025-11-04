import { useState, useEffect, useRef } from 'react';

export const useTypingIndicator = (chatId, currentUser) => {
  const [typingUsers, setTypingUsers] = useState([]);
  const timeoutRef = useRef(null);

  // Отправка события "печатает"
  const sendTypingStart = () => {
    // WebSocket отправка
    socket.emit('typing_start', {
      chat_id: chatId,
      user_id: currentUser.id
    });
  };

  // Отправка события "перестал печатать"
  const sendTypingStop = () => {
    socket.emit('typing_stop', {
      chat_id: chatId,
      user_id: currentUser.id
    });
  };

  // Очистка типинга через 3 секунды
  const clearTypingUser = (userId) => {
    setTypingUsers(prev => prev.filter(user => user.id !== userId));
  };

  useEffect(() => {
    // Слушаем события от других пользователей
    socket.on('user_typing', (data) => {
      setTypingUsers(prev => {
        const existing = prev.find(user => user.id === data.user_id);
        if (existing) {
          clearTimeout(existing.timeout);
        }
        
        const timeout = setTimeout(() => {
          clearTypingUser(data.user_id);
        }, 3000);

        return [...prev.filter(user => user.id !== data.user_id), {
          id: data.user_id,
          name: data.user_name,
          timeout: timeout
        }];
      });
    });

    return () => {
      socket.off('user_typing');
    };
  }, [chatId]);

  return { typingUsers, sendTypingStart, sendTypingStop };
};