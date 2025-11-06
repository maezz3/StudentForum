import React from 'react';
import Calendar from '../../components/calendar/Calendar/Calendar';
import Icon from '../../components/common/Icon/Icon';
import styles from './CalendarPage.module.css';

const CalendarPage = ({ group, onBack }) => {
  return (
    <div className={styles.calendarPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <Icon name="ArrowBigLeft" size={16} />
          Назад к группам
        </button>
        <div className={styles.groupInfo}>
          <h2>Календарь группы: {group.title}</h2>
          <p>События и мероприятия вашей группы</p>
        </div>
      </div>
      
      <div className={styles.calendarContainer}>
        <Calendar group={group} />
      </div>
    </div>
  );
};

export default CalendarPage;