import React from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './GroupCard.module.css';

const GroupCard = ({ group, onSelect }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {group.avatar ? (
            <img src={group.avatar} alt={group.title} />
          ) : (
            <span className={styles.avatarPlaceholder}>
              {group.title.charAt(0)}
            </span>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{group.title}</h3>
          <p className={styles.description}>{group.description}</p>
          <span className={`${styles.type} ${styles[group.type]}`}>
            <Icon 
              name={group.type === 'open' ? 'LockKeyholeOpen' : 'LockKeyhole'} 
              size={14} 
            />
            {group.type === 'open' ? ' Открытая' : ' Приватная'}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button 
          className={styles.primaryButton}
          onClick={() => onSelect(group)}
        >
          <Icon name="MessageCircle" size={16} />
          Перейти в чат
        </button>
        <button 
          className={styles.secondaryButton}
          onClick={() => onSelect(group, 'calendar')}
        >
          <Icon name="Calendar" size={16} />
          Календарь
        </button>
        <button 
          className={styles.secondaryButton}
          onClick={() => onSelect(group, 'announcements')}
        >
          <Icon name="Megaphone" size={16} />
          Объявления
        </button>
        <button 
          className={styles.secondaryButton}
          onClick={() => onSelect(group, 'files')}
        >
          <Icon name="Folder" size={16} />
          Файлы
        </button>
      </div>
    </div>
  );
};

export default GroupCard;