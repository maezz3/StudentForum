import React, { useState, useRef } from 'react';
import styles from './FileUploadModal.module.css';

const FileUploadModal = ({ isOpen, onClose, onUpload, currentFolder }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const folderNames = {
    all: 'Все файлы',
    lectures: 'Лекции',
    labs: 'Лабораторные работы',
    submissions: 'Сданные работы',
    projects: 'Проекты',
    materials: 'Материалы'
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      // Проверка размера файла (максимум 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert(`Файл "${file.name}" слишком большой. Максимальный размер: 50MB`);
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Выберите файлы для загрузки');
      return;
    }

    setUploading(true);

    try {
      // Имитация загрузки
      for (const file of selectedFiles) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const fileData = {
          name: file.name,
          type: file.name.split('.').pop().toLowerCase(),
          size: file.size,
          file: file
        };

        onUpload(fileData);
      }

      setSelectedFiles([]);
      onClose();
    } catch (error) {
      alert('Ошибка при загрузке файлов');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: '📕',
      doc: '📄',
      docx: '📄',
      ppt: '📊',
      pptx: '📊',
      xls: '📈',
      xlsx: '📈',
      zip: '📦',
      rar: '📦',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      txt: '📝',
      sql: '🗃️',
      default: '📄'
    };
    return iconMap[extension] || iconMap.default;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Загрузка файлов</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.uploadArea}>
            <div className={styles.uploadPrompt}>
              <div className={styles.uploadIcon}>📤</div>
              <h3>Перетащите файлы сюда</h3>
              <p>или</p>
              <button 
                className={styles.browseButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Выберите файлы
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                className={styles.fileInput}
              />
              <p className={styles.uploadHint}>
                Максимальный размер файла: 50MB
              </p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className={styles.selectedFiles}>
              <h4>Выбранные файлы ({selectedFiles.length})</h4>
              <div className={styles.fileList}>
                {selectedFiles.map((file, index) => (
                  <div key={index} className={styles.fileItem}>
                    <span className={styles.fileIcon}>
                      {getFileIcon(file.name)}
                    </span>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileName}>{file.name}</span>
                      <span className={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.uploadInfo}>
            <div className={styles.infoIcon}>💡</div>
            <div className={styles.infoText}>
              Файлы будут загружены в папку <strong>"{folderNames[currentFolder] || 'Материалы'}"</strong> и станут доступны всем участникам группы.
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={uploading}
          >
            Отмена
          </button>
          <button
            className={styles.uploadButton}
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
          >
            {uploading ? 'Загрузка...' : `Загрузить (${selectedFiles.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;