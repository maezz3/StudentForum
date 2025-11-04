import React from 'react';
import styles from './CalendarDay.module.css';

const CalendarDay = ({ currentDate, events, onEventClick, onCreateEvent }) => {
  return (
    <div className={styles.calendarDay}>
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>📅</div>
        <h3>Дневной вид</h3>
        <p>Скоро здесь появится дневной календарь</p>
      </div>
    </div>
  );
};

export default CalendarDay;