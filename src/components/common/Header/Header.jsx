import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Моковые данные для поиска (позже заменим на API)
  const searchData = {
    groups: [
      { id: 1, name: 'М8О-305Б-23', type: 'group', description: 'Группа по базам данных' },
      { id: 2, name: 'Авиационные системы', type: 'group', description: 'Обсуждение технологий' },
    ],
    messages: [
      { id: 1, text: 'Привет! Как дела с лабой?', type: 'message', group: 'М8О-305Б-23' },
      { id: 2, text: 'Напоминаю про дедлайн', type: 'message', group: 'Авиационные системы' },
    ],
    events: [
      { id: 1, title: 'Сдача лабораторной', type: 'event', date: '2024-10-28' },
    ]
  };

  // Фильтрация результатов
  const filteredResults = searchQuery ? [
    ...searchData.groups.filter(group => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(item => ({ ...item, category: 'groups' })),
    
    ...searchData.messages.filter(message =>
      message.text.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(item => ({ ...item, category: 'messages' })),
    
    ...searchData.events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(item => ({ ...item, category: 'events' }))
  ] : [];

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery) {
      setShowSearchResults(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Здесь можно сделать редирект на страницу поиска с полными результатами
    console.log('Search for:', searchQuery);
  };

  const handleResultClick = (result) => {
    console.log('Selected result:', result);
    setShowSearchResults(false);
    setSearchQuery('');
    // Здесь можно добавить навигацию к выбранному результату
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const getRoleLabel = (role) => {
    const labels = {
      guest: 'Гость',
      student: 'Студент',
      teacher: 'Преподаватель',
      admin: 'Администратор'
    };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      guest: '#6b7280',
      student: '#3b82f6', 
      teacher: '#f59e0b',
      admin: '#ef4444'
    };
    return colors[role] || '#6b7280';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      groups: 'LayoutDashboard',
      messages: 'MessageCircle',
      events: 'Calendar',
      files: 'Folder'
    };
    return icons[category] || 'Search';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      groups: 'Группы',
      messages: 'Сообщения',
      events: 'События',
      files: 'Файлы'
    };
    return labels[category] || 'Результаты';
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo size={28} withText={true} />
      </div>
      
      <div className={styles.search} ref={searchRef}>
        <form onSubmit={handleSearchSubmit}>
          <div className={styles.searchInputWrapper}>
            <input 
              type="text" 
              placeholder="Поиск групп, сообщений, событий..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
            />
            <Icon name="Search" size={18} className={styles.searchIcon} />
          </div>
        </form>
        
        {showSearchResults && searchQuery && (
          <div className={styles.searchResults}>
            <div className={styles.resultsHeader}>
              <span>Результаты поиска</span>
              <small>{filteredResults.length} найдено</small>
            </div>
            
            {filteredResults.length > 0 ? (
              <div className={styles.resultsList}>
                {Object.entries(
                  filteredResults.reduce((acc, result) => {
                    if (!acc[result.category]) acc[result.category] = [];
                    acc[result.category].push(result);
                    return acc;
                  }, {})
                ).map(([category, items]) => (
                  <div key={category} className={styles.resultsCategory}>
                    <div className={styles.categoryHeader}>
                      <Icon name={getCategoryIcon(category)} size={18} />
                      <span>{getCategoryLabel(category)}</span>
                      <span className={styles.categoryCount}>({items.length})</span>
                    </div>
                    {items.slice(0, 3).map(item => (
                      <div 
                        key={`${category}-${item.id}`}
                        className={styles.resultItem}
                        onClick={() => handleResultClick(item)}
                      >
                        <div className={styles.resultIcon}>
                          <Icon name={getCategoryIcon(category)} size={16} />
                        </div>
                        <div className={styles.resultContent}>
                          <div className={styles.resultTitle}>
                            {item.name || item.text || item.title}
                          </div>
                          <div className={styles.resultDescription}>
                            {item.description || item.group || item.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <Icon name="Search" size={32} className={styles.noResultsIcon} />
                <div className={styles.noResultsText}>
                  Ничего не найдено для "<strong>{searchQuery}</strong>"
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.headerControls}>
        <ThemeToggle />
        <div className={styles.user} ref={userMenuRef}>
          <div 
            className={styles.userInfo}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.userAvatar}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.fullname} />
              ) : (
                <Icon name="User" size={20} color="white" />
              )}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user?.fullname || 'Пользователь'}</span>
              <span 
                className={styles.userRole}
                style={{ color: getRoleColor(user?.role) }}
              >
                {getRoleLabel(user?.role)}
              </span>
            </div>
            <div className={`${styles.arrow} ${showUserMenu ? styles.arrowUp : ''}`}>
              <Icon name="ChevronDown" size={16} />
            </div>
          </div>
          
          {showUserMenu && (
            <div className={styles.userMenu}>
              <div className={styles.menuHeader}>
                <div className={styles.menuAvatar}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.fullname} />
                  ) : (
                    <Icon name="User" size={24} color="white" />
                  )}
                </div>
                <div className={styles.menuUserInfo}>
                  <div className={styles.menuUserName}>{user?.fullname}</div>
                  <div 
                    className={styles.menuUserRole}
                    style={{ color: getRoleColor(user?.role) }}
                  >
                    {getRoleLabel(user?.role)}
                  </div>
                  <div className={styles.menuUserEmail}>{user?.email}</div>
                </div>
              </div>
              
              <div className={styles.menuDivider}></div>
              
              <button className={styles.menuItem}>
                <Icon name="User" size={16} />
                Мой профиль
              </button>
              <button className={styles.menuItem}>
                <Icon name="Settings" size={16} />
                Настройки
              </button>
              
              <div className={styles.menuDivider}></div>
              
              <button 
                className={styles.menuItem}
                onClick={handleLogout}
              >
                <Icon name="LogOut" size={16} />
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;