import React, { useState } from 'react';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import CreateAnnouncementModal from '../CreateAnnouncementModal/CreateAnnouncementModal';
import styles from './AnnouncementsList.module.css';

const AnnouncementsList = ({ group }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Важное: Дедлайн лабораторной работы',
      content: 'Напоминаем, что дедлайн сдачи первой лабораторной работы по базам данных - до 10 ноября. Работы принимаются в электронном виде через систему.',
      author: {
        id: 2,
        fullname: 'Мария Петрова',
        role: 'teacher'
      },
      group_id: 1,
      color: '#ef4444',
      priority: 'high',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_pinned: true
    },
    {
      id: 2,
      title: 'Изменение расписания занятий',
      content: 'В связи с проведением конференции, занятие в пятницу переносится с 10:00 на 14:00. Занятие пройдет в аудитории 305.',
      author: {
        id: 2,
        fullname: 'Мария Петрова', 
        role: 'teacher'
      },
      group_id: 1,
      color: '#f59e0b',
      priority: 'medium',
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      is_pinned: false
    },
    {
      id: 3,
      title: 'Собрание студенческого совета',
      content: 'Приглашаем всех желающих на собрание студенческого совета, которое состоится в эту среду в 16:00 в актовом зале. Будем обсуждать организацию мероприятий.',
      author: {
        id: 4,
        fullname: 'Анна Козлова',
        role: 'student'
      },
      group_id: 1,
      color: '#3b82f6',
      priority: 'low',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      is_pinned: false
    },
    {
      id: 4,
      title: 'Доступ к учебным материалам',
      content: 'Все необходимые материалы для подготовки к экзамену уже доступны в разделе "Файлы". Рекомендую начать подготовку заранее.',
      author: {
        id: 2,
        fullname: 'Мария Петрова',
        role: 'teacher'
      },
      group_id: 1,
      color: '#10b981',
      priority: 'medium',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      is_pinned: true
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pinned', 'high', 'medium', 'low'

  // Моковый текущий пользователь (преподаватель)
  const currentUser = {
    id: 2,
    fullname: 'Мария Петрова',
    role: 'teacher'
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'pinned') return announcement.is_pinned;
    return announcement.priority === filter;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.is_pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.is_pinned);

  const handleCreateAnnouncement = (announcementData) => {
    const newAnnouncement = {
      ...announcementData,
      id: Date.now(),
      author: currentUser,
      group_id: group.id,
      created_at: new Date().toISOString(),
      is_pinned: false
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
  };

  const handleTogglePin = (announcementId) => {
    setAnnouncements(prev => prev.map(a => 
      a.id === announcementId ? { ...a, is_pinned: !a.is_pinned } : a
    ));
  };

  return (
    <div className={styles.announcementsList}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'pinned' ? styles.active : ''}`}
            onClick={() => setFilter('pinned')}
          >
            Закрепленные
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'high' ? styles.active : ''}`}
            onClick={() => setFilter('high')}
          >
            Важные
          </button>
          <button 
            className={`${styles.filterButton} ${filter === 'medium' ? styles.active : ''}`}
            onClick={() => setFilter('medium')}
          >
            Обычные
          </button>
        </div>

        {currentUser.role === 'teacher' && (
          <button 
            className={styles.createButton}
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Создать объявление
          </button>
        )}
      </div>

      <div className={styles.announcements}>
        {/* Закрепленные объявления */}
        {pinnedAnnouncements.length > 0 && (
          <div className={styles.pinnedSection}>
            <h3 className={styles.sectionTitle}>📌 Закрепленные</h3>
            <div className={styles.announcementsGrid}>
              {pinnedAnnouncements.map(announcement => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  currentUser={currentUser}
                  onDelete={handleDeleteAnnouncement}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {/* Обычные объявления */}
        {regularAnnouncements.length > 0 && (
          <div className={styles.regularSection}>
            {pinnedAnnouncements.length > 0 && (
              <h3 className={styles.sectionTitle}>📢 Все объявления</h3>
            )}
            <div className={styles.announcementsGrid}>
              {regularAnnouncements.map(announcement => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  currentUser={currentUser}
                  onDelete={handleDeleteAnnouncement}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {/* Пустое состояние */}
        {filteredAnnouncements.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📢</div>
            <h3>Нет объявлений</h3>
            <p>
              {filter === 'all' 
                ? 'В этой группе пока нет объявлений'
                : `Нет объявлений с фильтром "${getFilterLabel(filter)}"`
              }
            </p>
            {currentUser.role === 'teacher' && filter === 'all' && (
              <button 
                className={styles.createFirstButton}
                onClick={() => setIsCreateModalOpen(true)}
              >
                Создать первое объявление
              </button>
            )}
          </div>
        )}
      </div>

      <CreateAnnouncementModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateAnnouncement}
        group={group}
      />
    </div>
  );
};

// Вспомогательная функция для labels фильтров
function getFilterLabel(filter) {
  const labels = {
    all: 'Все',
    pinned: 'Закрепленные',
    high: 'Важные',
    medium: 'Обычные',
    low: 'Низкий приоритет'
  };
  return labels[filter] || filter;
}

export default AnnouncementsList;