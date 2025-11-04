import React, { useState } from 'react';
import styles from './CreateFolderModal.module.css';

const CreateFolderModal = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');
  const [folderIcon, setFolderIcon] = useState('📁');

  const folderIcons = [
    '📁', '📂', '📚', '🔬', '📊', '📈', '💼', '📎', 
    '📝', '🗂️', '📋', '📒', '📔', '📕', '📗', '📘'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!folderName.trim()) {
      alert('Введите название папки');
      return;
    }

    onCreate({
      name: folderName.trim(),
      icon: folderIcon
    });

    setFolderName('');
    setFolderIcon('📁');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Создать новую папку</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="folderName">Название папки *</label>
            <input
              type="text"
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Введите название папки..."
              className={styles.input}
              maxLength={50}
            />
            <div className={styles.charCount}>
              {folderName.length}/50 символов
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Иконка папки</label>
            <div className={styles.iconGrid}>
              {folderIcons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  className={`${styles.iconButton} ${
                    folderIcon === icon ? styles.iconButtonActive : ''
                  }`}
                  onClick={() => setFolderIcon(icon)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formInfo}>
            <div className={styles.infoIcon}>💡</div>
            <div className={styles.infoText}>
              Папка поможет организовать файлы по категориям. Все участники группы смогут видеть и использовать созданные папки.
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.createButton}
            >
              Создать папку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;