import React from 'react';
import FileCard from '../FileCard/FileCard';
import styles from './FileGrid.module.css';

const FileGrid = ({ files, currentUser, onDeleteFile, onDownloadFile }) => {
  const getFileTypeIcon = (fileType) => {
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
      js: '⚡',
      py: '🐍',
      default: '📄'
    };

    return iconMap[fileType] || iconMap.default;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filesWithIcons = files.map(file => ({
    ...file,
    icon: getFileTypeIcon(file.type),
    formattedSize: formatFileSize(file.size)
  }));

  return (
    <div className={styles.fileGrid}>
      {filesWithIcons.map(file => (
        <FileCard
          key={file.id}
          file={file}
          currentUser={currentUser}
          onDelete={onDeleteFile}
          onDownload={onDownloadFile}
        />
      ))}
    </div>
  );
};

export default FileGrid;