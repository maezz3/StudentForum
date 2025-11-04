import React, { useState } from 'react';
import styles from './CreateAnnouncementModal.module.css';

const CreateAnnouncementModal = ({ isOpen, onClose, onCreate, group }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    color: '#3b82f6'
  });

  const priorityOptions = [
    { value: 'high', label: 'Важное', color: '#ef4444', description: 'Срочные и критически важные уведомления' },
    { value: 'medium', label: 'Обычное', color: '#3b82f6', description: 'Стандартные объявления и новости' },
    { value: 'low', label: 'Информационное', color: '#10b981', description: 'Дополнительная информация и напоминания' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Введите заголовок объявления');
      return;
    }

    if (!formData.content.trim()) {
      alert('Введите содержание объявления');
      return;
    }

    onCreate(formData);
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      color: '#3b82f6'
    });
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePriorityChange = (priority) => {
    const selected = priorityOptions.find(opt => opt.value === priority);
    setFormData(prev => ({
      ...prev,
      priority: priority,
      color: selected ? selected.color : prev.color
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Создать объявление</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Заголовок *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Введите заголовок объявления..."
              className={styles.input}
              maxLength={100}
            />
            <div className={styles.charCount}>
              {formData.title.length}/100 символов
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Содержание *</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Введите текст объявления..."
              className={styles.textarea}
              rows="6"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Приоритет объявления</label>
            <div className={styles.priorityOptions}>
              {priorityOptions.map(option => (
                <label key={option.value} className={styles.priorityOption}>
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={formData.priority === option.value}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    className={styles.radioInput}
                  />
                  <div 
                    className={`${styles.priorityCard} ${
                      formData.priority === option.value ? styles.priorityCardActive : ''
                    }`}
                    style={{ borderLeftColor: option.color }}
                  >
                    <div className={styles.priorityHeader}>
                      <div 
                        className={styles.priorityColor}
                        style={{ backgroundColor: option.color }}
                      />
                      <span className={styles.priorityLabel}>{option.label}</span>
                    </div>
                    <p className={styles.priorityDescription}>{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formInfo}>
            <div className={styles.infoIcon}>💡</div>
            <div className={styles.infoText}>
              Объявление будет опубликовано в группе <strong>{group?.title}</strong> и станет доступно всем участникам.
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
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;