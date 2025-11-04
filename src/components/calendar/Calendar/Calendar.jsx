import React, { useState } from 'react';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import EventsList from '../EventsList/EventsList';
import EventModal from '../EventModal/EventModal';
import styles from './Calendar.module.css';

const Calendar = ({ group }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Моковые события (потом заменим на API)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Дедлайн ЛР1 - Базы данных',
      description: 'Сдача первой лабораторной работы по проектированию БД',
      datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'deadline',
      color: '#ef4444',
      group_id: 1
      },
      {
      id: 2,
      title: 'Лекция: Основы SQL',
      description: 'Введение в SQL, SELECT, JOIN, агрегатные функции',
      datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'lecture',
      color: '#3b82f6',
      group_id: 1
      },
      {
      id: 3,
      title: 'Собрание по проекту',
      description: 'Обсуждение архитектуры БД и распределение задач',
      datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'meeting',
      color: '#10b981',
      group_id: 1
      },
      {
      id: 4,
      title: 'Экзамен по БД',
      description: 'Промежуточный экзамен по теории баз данных',
      datetime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'exam',
      color: '#f59e0b',
      group_id: 1
      },
      {
      id: 5,
      title: 'День открытых дверей',
      description: 'Мероприятие для будущих студентов',
      datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'event',
      color: '#8b5cf6',
      group_id: 1
      }
  ]);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCreateEvent = (date) => {
    setSelectedEvent({
      title: '',
      description: '',
      datetime: date.toISOString(),
      type: 'event',
      color: '#6b7280',
      group_id: group?.id
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent?.id) {
      // Редактирование существующего события
      setEvents(prev => prev.map(e => e.id === selectedEvent.id ? eventData : e));
    } else {
      // Создание нового события
      const newEvent = {
        ...eventData,
        id: Date.now()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className={styles.calendar}>
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onCreateEvent={() => handleCreateEvent(new Date())}
      />
      
      <div className={styles.calendarBody}>
        <div className={styles.calendarGrid}>
          <CalendarGrid
            currentDate={currentDate}
            view={view}
            events={events}
            onEventClick={handleEventClick}
            onCreateEvent={handleCreateEvent}
          />
        </div>
        
        <div className={styles.eventsSidebar}>
          <EventsList
            events={events}
            currentDate={currentDate}
            onEventClick={handleEventClick}
          />
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};

export default Calendar;