import React from 'react';
import styles from './EventsList.module.css';

const EventsList = ({ events, currentDate, onEventClick }) => {
  const getTodayEvents = () => {
    const today = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.datetime);
      return (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.datetime);
        return eventDate > today && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  };

  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();

  const formatEventTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventDate = (datetime) => {
    return new Date(datetime).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={styles.eventsList}>
      <h3 className={styles.sectionTitle}>Сегодня</h3>
      {todayEvents.length === 0 ? (
        <p className={styles.noEvents}>Событий на сегодня нет</p>
      ) : (
        <div className={styles.events}>
          {todayEvents.map(event => (
            <div
              key={event.id}
              className={styles.event}
              onClick={() => onEventClick(event)}
            >
              <div 
                className={styles.eventColor} 
                style={{ backgroundColor: event.color }}
              />
              <div className={styles.eventContent}>
                <div className={styles.eventTime}>
                  {formatEventTime(event.datetime)}
                </div>
                <div className={styles.eventTitle}>{event.title}</div>
                {event.description && (
                  <div className={styles.eventDescription}>
                    {event.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className={styles.sectionTitle}>Ближайшие события</h3>
      {upcomingEvents.length === 0 ? (
        <p className={styles.noEvents}>Ближайших событий нет</p>
      ) : (
        <div className={styles.events}>
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className={styles.event}
              onClick={() => onEventClick(event)}
            >
              <div 
                className={styles.eventColor} 
                style={{ backgroundColor: event.color }}
              />
              <div className={styles.eventContent}>
                <div className={styles.eventDate}>
                  {formatEventDate(event.datetime)}
                </div>
                <div className={styles.eventTitle}>{event.title}</div>
                {event.description && (
                  <div className={styles.eventDescription}>
                    {event.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;