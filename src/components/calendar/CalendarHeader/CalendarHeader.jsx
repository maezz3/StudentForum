import React from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './CalendarHeader.module.css';

const CalendarHeader = ({ 
  currentDate, 
  view, 
  onViewChange, 
  onPrev, 
  onNext, 
  onToday,
  onCreateEvent 
}) => {
  const formatHeaderDate = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('ru-RU', { 
        month: 'long', 
        year: 'numeric' 
      });
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long' 
      })} - ${endOfWeek.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      })}`;
    } else {
      return currentDate.toLocaleDateString('ru-RU', { 
        weekday: 'long',
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h2 className={styles.title}>Календарь</h2>
        <button className={styles.todayButton} onClick={onToday}>
          Сегодня
        </button>
        <div className={styles.navigation}>
          <button className={styles.navButton} onClick={onPrev}>
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button className={styles.navButton} onClick={onNext}>
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
        <span className={styles.currentDate}>
          {formatHeaderDate()}
        </span>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.viewSwitcher}>
          <button 
            className={`${styles.viewButton} ${view === 'month' ? styles.active : ''}`}
            onClick={() => onViewChange('month')}
          >
            Месяц
          </button>
          <button 
            className={`${styles.viewButton} ${view === 'week' ? styles.active : ''}`}
            onClick={() => onViewChange('week')}
          >
            Неделя
          </button>
          <button 
            className={`${styles.viewButton} ${view === 'day' ? styles.active : ''}`}
            onClick={() => onViewChange('day')}
          >
            День
          </button>
        </div>

        <button 
          className={styles.createEventButton}
          onClick={onCreateEvent}
        >
          + Создать событие
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;