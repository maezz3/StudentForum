import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Icon from '../Icon/Icon';
import styles from './Sidebar.module.css';

const Sidebar = ({ currentPage, onPageChange, selectedGroup }) => {
  const { user } = useAuth();

  const baseMenuItems = [
    { id: 'profile', label: 'Мой профиль', icon: 'User' },
    { id: 'groups', label: 'Все группы', icon: 'LayoutDashboard' },
  ];

  // Дополнительные пункты если выбрана группа
  const groupMenuItems = selectedGroup ? [
    { id: 'chat', label: 'Чат группы', icon: 'MessageCircle' },
    { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
    { id: 'announcements', label: 'Объявления', icon: 'Megaphone' },
    { id: 'files', label: 'Файлы', icon: 'Folder' }
  ] : [];

  const menuItems = [...baseMenuItems, ...groupMenuItems];
  
  const getRoleIcon = (role) => {
    const roleIcons = {
      student: 'GraduationCap',
      teacher: 'UserCheck', 
      guest: 'ScanEye',
      admin: 'Shield'
    };
    return roleIcons[role] || 'User';
  };

  const getRoleLabel = (role) => {
    const labels = {
      student: 'Студент',
      teacher: 'Преподаватель',
      guest: 'Гость',
      admin: 'Администратор'
    };
    return labels[role] || role;
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${
              currentPage === item.id ? styles.navItemActive : ''
            }`}
            onClick={() => onPageChange(item.id)}
          >
            <span className={styles.navIcon}>
              <Icon name={item.icon} size={20} />
            </span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {selectedGroup && (
        <div className={styles.footer}>
          <div className={styles.currentGroup}>
            <span className={styles.groupName}>{selectedGroup.title}</span>
            <span className={styles.groupType}>
              {selectedGroup.type === 'open' ? 'Открытая' : 'Приватная'}
            </span>
          </div>
        </div>
      )}

      {/* Информация о пользователе в сайдбаре */}
      {!selectedGroup && user && (
        <div className={styles.userSidebar}>
          <div className={styles.userSidebarHeader}>
            <span>Ваш статус</span>
          </div>
          <div className={styles.userStatus}>
            <div className={styles.userStatusRole}>
              <span className={styles.roleIcon}>
                <Icon name={getRoleIcon(user.role)} size={20} />
              </span>
              <span className={styles.roleText}>
                {getRoleLabel(user.role)}
              </span>
            </div>
            {user.role === 'guest' && (
              <div className={styles.guestInfo}>
                <p>Для получения доступа к функциям студента/преподавателя обратитесь к администрации</p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;