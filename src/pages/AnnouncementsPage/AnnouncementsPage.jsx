import React from 'react';
import AnnouncementsList from '../../components/announcements/AnnouncementsList/AnnouncementsList';
import styles from './AnnouncementsPage.module.css';

const AnnouncementsPage = ({ group, onBack }) => {
  return (
    <div className={styles.announcementsPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← Назад к группам
        </button>
        <div className={styles.groupInfo}>
          <h2>Объявления группы: {group.title}</h2>
          <p>Важные уведомления и новости вашей группы</p>
        </div>
      </div>
      
      <div className={styles.announcementsContainer}>
        <AnnouncementsList group={group} />
      </div>
    </div>
  );
};

export default AnnouncementsPage;