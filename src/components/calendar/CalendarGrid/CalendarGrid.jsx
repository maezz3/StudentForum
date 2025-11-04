import React from 'react';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import CalendarWeek from '../CalendarWeek/CalendarWeek';
import CalendarDay from '../CalendarDay/CalendarDay';
import styles from './CalendarGrid.module.css';

const CalendarGrid = ({ currentDate, view, events, onEventClick, onCreateEvent }) => {
  const renderView = () => {
    switch (view) {
      case 'month':
        return (
          <CalendarMonth
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
      case 'week':
        return (
          <CalendarWeek
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
      case 'day':
        return (
          <CalendarDay
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.calendarGrid}>
      {renderView()}
    </div>
  );
};

export default CalendarGrid;