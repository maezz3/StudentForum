import React, { useState } from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './FileCard.module.css';

const FileCard = ({ file, currentUser, onDelete, onDownload }) => {
  const [showActions, setShowActions] = useState(false);

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
    } else if (diffDays < 7) {
      return `${diffDays} дней назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric',
        month: 'short'
      });
    }
  };

  const canDelete = currentUser.role === 'teacher' || currentUser.id === file.uploaded_by.id;

  const handleDownload = () => {
    onDownload(file);
    // В реальном приложении здесь будет скачивание файла
    alert(`Скачивание файла: ${file.name}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить файл "${file.name}"?`)) {
      onDelete(file.id);
    }
  };

  const getFileTypeColor = (fileType) => {
    const colorMap = {
      pdf: '#ef4444',
      doc: '#3b82f6',
      docx: '#3b82f6',
      ppt: '#f59e0b',
      pptx: '#f59e0b',
      xls: '#10b981',
      xlsx: '#10b981',
      zip: '#8b5cf6',
      rar: '#8b5cf6',
      jpg: '#ec4899',
      jpeg: '#ec4899',
      png: '#ec4899',
      default: '#6b7280'
    };
    return colorMap[fileType] || colorMap.default;
  };

  return (
    <div 
      className={styles.fileCard}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Верхняя часть с иконкой и действиями */}
      <div className={styles.fileHeader}>
        <div 
          className={styles.fileIcon}
          style={{ backgroundColor: getFileTypeColor(file.type) }}
        >
          {file.icon}
        </div>
        
        {showActions && (
          <div className={styles.fileActions}>
            <button 
              className={styles.downloadButton}
              onClick={handleDownload}
              title="Скачать"
            >
              <Icon name="Download" size={16} />
            </button>
            {canDelete && (
              <button 
                className={styles.deleteButton}
                onClick={handleDelete}
                title="Удалить"
              >
                <Icon name="Trash2" size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Информация о файле */}
      <div className={styles.fileInfo}>
        <h4 className={styles.fileName} title={file.name}>
          {file.name}
        </h4>
        
        <div className={styles.fileMeta}>
          <span className={styles.fileSize}>{file.formattedSize}</span>
          <span className={styles.fileType}>.{file.type}</span>
        </div>

        <div className={styles.uploadInfo}>
          <div className={styles.uploader}>
            <div className={styles.uploaderAvatar}>
              {file.uploaded_by.fullname.charAt(0)}
            </div>
            <div className={styles.uploaderDetails}>
              <span className={styles.uploaderName}>{file.uploaded_by.fullname}</span>
              <span className={styles.uploaderRole}>
                {file.uploaded_by.role === 'teacher' ? 'Преподаватель' : 'Студент'}
              </span>
            </div>
          </div>
          <span className={styles.uploadDate}>{formatDate(file.uploaded_at)}</span>
        </div>
      </div>

      {/* Индикатор типа пользователя */}
      {file.uploaded_by.role === 'teacher' && (
        <div className={styles.teacherBadge}>
          📚 Материал преподавателя
        </div>
      )}
    </div>
  );
};

export default FileCard;