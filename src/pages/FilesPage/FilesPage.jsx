import React from 'react';
import FileBrowser from '../../components/files/FileBrowser/FileBrowser';
import Icon from '../../components/common/Icon/Icon';
import styles from './FilesPage.module.css';

const FilesPage = ({ group, onBack }) => {
  return (
    <div className={styles.filesPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <Icon name="ArrowBigLeft" size={16} />
          Назад к группам
        </button>
        <div className={styles.groupInfo}>
          <h2>Файлы группы: {group.title}</h2>
          <p>Общее файловое хранилище для учебных материалов и заданий</p>
        </div>
      </div>
      
      <div className={styles.filesContainer}>
        <FileBrowser group={group} />
      </div>
    </div>
  );
};

export default FilesPage;