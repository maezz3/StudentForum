import React from 'react';
import styles from './CalendarMonth.module.css';

const CalendarMonth = ({ currentDate, events, onEventClick, onCreateEvent }) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  const isSameMonth = (day) => {
    return day.getMonth() === currentDate.getMonth();
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.datetime);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    // Дни предыдущего месяца
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPrevMonth - i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({ date: day, isCurrentMonth: true });
    }
    
    // Дни следующего месяца
    const totalCells = 42; // 6 недель
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className={styles.calendarMonth}>
      {/* Заголовки дней недели */}
      <div className={styles.weekDays}>
        {weekDays.map(day => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
      
      {/* Сетка дней */}
      <div className={styles.daysGrid}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day.date);
          const today = isToday(day.date);
          
          return (
            <div
              key={index}
              className={`${styles.day} ${
                !day.isCurrentMonth ? styles.otherMonth : ''
              } ${today ? styles.today : ''}`}
              onClick={() => day.isCurrentMonth && onCreateEvent(day.date)}
            >
              <div className={styles.dayHeader}>
                <span className={styles.dayNumber}>
                  {day.date.getDate()}
                </span>
              </div>
              
              <div className={styles.events}>
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className={styles.event}
                    style={{ backgroundColor: event.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    <span className={styles.eventTime}>
                      {new Date(event.datetime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className={styles.eventTitle}>{event.title}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className={styles.moreEvents}>
                    +{dayEvents.length - 3} еще
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;