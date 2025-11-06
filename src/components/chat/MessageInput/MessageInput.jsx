import React, { useState, useRef } from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './MessageInput.module.css';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // В реальном приложении здесь будет загрузка файла
      alert(`Файл "${file.name}" будет прикреплен к сообщению`);
      // Очищаем input для возможности выбора того же файла снова
      e.target.value = '';
    }
  };

  const insertEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
  };

  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          {/* Кнопки действий */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleFileAttach}
              title="Прикрепить файл"
            >
              <Icon name="Paperclip" size={20} />
            </button>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => insertEmoji('😊')}
              title="Добавить эмодзи"
            >
              <Icon name="Smile" size={20} />
            </button>
          </div>

          {/* Поле ввода */}
          <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight(e);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Напишите сообщение..."
              className={styles.textInput}
              rows={1}
              disabled={disabled}
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!message.trim() || disabled}
            title="Отправить сообщение"
          >
            <span className={styles.sendIcon}>
              <Icon name="Send" size={20} />
            </span>
          </button>
        </div>

        {/* Скрытый input для файлов */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className={styles.fileInput}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.zip"
        />
      </form>

      {/* Простой выбор эмодзи */}
      {isFocused && (
        <div className={styles.emojiPicker}>
          <div className={styles.emojiGrid}>
            {['😊', '😂', '🤔', '👍', '❤️', '🎉', '🚀', '💡'].map(emoji => (
              <button
                key={emoji}
                type="button"
                className={styles.emojiButton}
                onClick={() => insertEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageInput;