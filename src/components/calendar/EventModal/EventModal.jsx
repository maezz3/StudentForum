import React, { useState, useEffect } from 'react';
import styles from './EventModal.module.css';

const EventModal = ({ isOpen, event, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
    type: 'event',
    color: '#3b82f6'
  });

  const eventTypes = [
    { value: 'lecture', label: 'Лекция', color: '#3b82f6' },
    { value: 'deadline', label: 'Дедлайн', color: '#ef4444' },
    { value: 'meeting', label: 'Собрание', color: '#10b981' },
    { value: 'exam', label: 'Экзамен', color: '#f59e0b' },
    { value: 'event', label: 'Событие', color: '#8b5cf6' },
    { value: 'holiday', label: 'Выходной', color: '#06b6d4' }
  ];

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.datetime);
      const localDateTime = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        datetime: localDateTime,
        type: event.type || 'event',
        color: event.color || '#3b82f6'
      });
    } else {
      // Значения по умолчанию для нового события
      const now = new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      setFormData({
        title: '',
        description: '',
        datetime: localDateTime,
        type: 'event',
        color: '#3b82f6'
      });
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Введите название события');
      return;
    }

    const eventData = {
      ...formData,
      datetime: new Date(formData.datetime).toISOString()
    };

    onSave(eventData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      color: color
    }));
  };

  const handleTypeChange = (type) => {
    const selectedType = eventTypes.find(t => t.value === type);
    setFormData(prev => ({
      ...prev,
      type: type,
      color: selectedType ? selectedType.color : prev.color
    }));
  };

  if (!isOpen) return null;

  const isEditing = event?.id;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{isEditing ? 'Редактировать событие' : 'Создать событие'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Название события *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Введите название события..."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Описание события..."
              className={styles.textarea}
              rows="3"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="datetime">Дата и время *</label>
            <input
              type="datetime-local"
              id="datetime"
              value={formData.datetime}
              onChange={(e) => handleChange('datetime', e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Тип события</label>
            <div className={styles.typeGrid}>
              {eventTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  className={`${styles.typeButton} ${
                    formData.type === type.value ? styles.typeButtonActive : ''
                  }`}
                  onClick={() => handleTypeChange(type.value)}
                >
                  <div 
                    className={styles.typeColor} 
                    style={{ backgroundColor: type.color }}
                  />
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Цвет события</label>
            <div className={styles.colorGrid}>
              {[
                '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
                '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'
              ].map(color => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorButton} ${
                    formData.color === color ? styles.colorButtonActive : ''
                  }`}
                  onClick={() => handleColorChange(color)}
                >
                  <div 
                    className={styles.colorCircle} 
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            {isEditing && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDelete(event.id)}
              >
                Удалить
              </button>
            )}
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Отмена
              </button>
              <button
                type="submit"
                className={styles.saveButton}
              >
                {isEditing ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;