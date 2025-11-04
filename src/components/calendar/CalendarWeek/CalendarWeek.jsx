import React from 'react';
import styles from './CalendarWeek.module.css';

const CalendarWeek = ({ currentDate, events, onEventClick, onCreateEvent }) => {
  return (
    <div className={styles.calendarWeek}>
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>📅</div>
        <h3>Недельный вид</h3>
        <p>Скоро здесь появится недельный календарь</p>
      </div>
    </div>
  );
};

export default CalendarWeek;