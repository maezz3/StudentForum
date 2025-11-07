import React, { useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import GroupCard from '../../components/groups/GroupCard/GroupCard';
import GroupJoinModal from '../../components/groups/GroupJoinModal/GroupJoinModal';
import styles from './GroupsPage.module.css';

const GroupsPage = ({ onSelectGroup }) => {
  const { groups, loading, error, joinGroup, refresh } = useGroups();
  const [joinModal, setJoinModal] = useState({ isOpen: false, group: null });
  const [joinLoading, setJoinLoading] = useState(false);

  const handleJoinClick = (group) => {
    if (group.type === 'open') {
      // Автоматическое вступление в открытую группу
      handleJoinGroup(group.id);
    } else {
      // Для приватной группы показываем модалку с кодом приглашения
      setJoinModal({ isOpen: true, group });
    }
  };

  const handleJoinGroup = async (groupId, inviteCode = null) => {
    try {
      await joinGroup(groupId, inviteCode);
      setJoinModal({ isOpen: false, group: null });
      // Можно показать уведомление об успешном вступлении
      console.log('Успешно вступили в группу');
    } catch (err) {
      console.error('Failed to join group:', err);
      alert('Не удалось вступить в группу: ${err.message}');
    } finally {
      setJoinLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Загрузка групп...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
        <button 
          onClick={refresh}
          className={styles.retryButton}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className={styles.groupsPage}>
      <div className={styles.header}>
        <h2>Мои группы</h2>
        <p>Выберите группу для просмотра</p>
      </div>
      
      <div className={styles.groupsList}>
        {groups.map(group => (
          <GroupCard
            key={group.id}
            group={group}
            onSelect={onSelectGroup}
            onJoin={handleJoinClick}
          />
        ))}
        
        {groups.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👥</div>
            <h3>Нет групп</h3>
            <p>Вы еще не состоите ни в одной группе</p>
            <button 
              onClick={refresh}
              className={styles.refreshButton}
            >
              Обновить список
            </button>
          </div>
        )}
      </div>

      <GroupJoinModal
        isOpen={joinModal.isOpen}
        group={joinModal.group}
        onJoin={handleJoinGroup}
        onClose={() => setJoinModal({ isOpen: false, group: null })}
        loading={joinLoading}
      />
    </div>
  );
};

export default GroupsPage;