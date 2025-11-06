import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header/Header';
import Sidebar from './components/common/Sidebar/Sidebar';
import Footer from './components/common/Footer/Footer';
import { groupService } from './services/groupService';
import './App.css';

// Импортируем страницы
import GroupsPage from './pages/GroupsPage/GroupsPage';
import ChatPage from './pages/ChatPage/ChatPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import AnnouncementsPage from './pages/AnnouncementsPage/AnnouncementsPage';
import FilesPage from './pages/FilesPage/FilesPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import AboutPage from './pages/AboutPage/AboutPage';


const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('welcome'); // Начинаем с welcome
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);

  const getMainContentClass = () => {
    const baseClass = "main-content";
    
    // Страницы где не нужен padding и серый фон
    const fullWidthPages = ['welcome', 'auth', 'about'];
    
    if (fullWidthPages.includes(currentPage)) {
      return `${baseClass} ${baseClass}--full-width`;
    }
    
    return baseClass;
  };

  useEffect(() => {
    if (user) {
      loadUserGroups();
      // Если пользователь авторизован, переходим на группы
      if (currentPage === 'welcome') {
        setCurrentPage('groups');
      }
    }
  }, [user, currentPage]);

  useEffect(() => {
    if (user && currentPage === 'welcome') {
      setCurrentPage('groups');
    }
  }, [user, currentPage]);

  const loadUserGroups = async () => {
    setGroupsLoading(true);
    try {
      const userGroups = await groupService.getUserGroups();
      setGroups(userGroups);
    } catch (error) {
      console.error('Failed to load groups:', error);
      // Временно используем моковые данные
      setGroups([
        {
          id: 1,
          university_id: 1,
          title: 'М8О-305Б-23',
          description: 'Группа 8 института МАИ по направлении "Прикладная математика". Обсуждение лабораторных работ и проектов.',
          code: 'M8O305B23',
          type: 'open',
          avatar: '',
          chat: { id: 1, group_id: 1, title: 'М8О-305Б-23 - Общий чат' },
          calendar: { id: 1, group_id: 1, events: [] },
          announcements: []
        },
        {
          id: 2,
          university_id: 1,
          title: 'Авиационные системы',
          description: 'Обсуждение современных авиационных технологий и систем управления.',
          code: 'AVIASYSTEMS',
          type: 'private',
          avatar: '',
          chat: { id: 2, group_id: 2, messages: [] },
          calendar: { id: 2, group_id: 2, events: [] },
          announcements: []
        }
      ]);
    } finally {
      setGroupsLoading(false);
    }
  };

  // Показываем загрузку
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Остальная логика приложения...
  const handleSelectGroup = (group, page = 'chat') => {
    setSelectedGroup(group);
    setCurrentPage(page);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setCurrentPage('groups');
  };

  const renderContent = () => {
    // Если пользователь не авторизован и на главной - показываем Welcome
    if (!user && currentPage === 'welcome') {
      return <WelcomePage onNavigate={setCurrentPage} />;
    }

    // Редирект неавторизованных пользователей
    if (!user && currentPage !== 'auth' && currentPage !== 'welcome' && currentPage !== 'about') {
      return <WelcomePage onNavigate={setCurrentPage} />;
    }

    // Страница "О проекте" (объединяем помощь, о проекте и контакты)
    if (currentPage === 'about') {
      return <AboutPage onBack={() => setCurrentPage(user ? 'groups' : 'welcome')} />;
    }

    if (user && !selectedGroup && currentPage !== 'groups' && currentPage !== 'profile' && currentPage !== 'auth') {
      return (
        <div className="page-placeholder">
          <div className="placeholder-icon">👥</div>
          <h3>Выберите группу</h3>
          <p>Для просмотра этой страницы выберите группу из списка</p>
          <button 
            onClick={() => setCurrentPage('groups')}
            style={{
              padding: '10px 20px',
              background: 'var(--primary-500)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Перейти к группам
          </button>
        </div>
      );
    }

    switch (currentPage) {
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return <ProfilePage />;
      case 'groups':
        return (
          <GroupsPage 
            groups={groups}
            groupsLoading={groupsLoading}
            onSelectGroup={handleSelectGroup}
            onRefreshGroups={loadUserGroups}
          />
        );
      case 'chat':
        return (
          <ChatPage 
            group={selectedGroup}
            onBack={handleBackToGroups}
          />
        );
      case 'calendar':
        return (
          <CalendarPage 
            group={selectedGroup}
            onBack={handleBackToGroups}
          />
        );
      case 'announcements':
        return (
          <AnnouncementsPage 
            group={selectedGroup}
            onBack={handleBackToGroups}
          />
        );
      case 'files':
        return (
          <FilesPage 
            group={selectedGroup}
            onBack={handleBackToGroups}
          />
        );
      default:
        return (
          <div className="page-placeholder">
            <div className="placeholder-icon">🚧</div>
            <h3>Страница в разработке</h3>
            <p>Эта страница скоро будет доступна</p>
          </div>
        );
    }
  };

  return (
    <div className="app">
      {user && <Header />}
      <div className="app-body">
        {user && (
          <Sidebar 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            selectedGroup={selectedGroup}
          />
        )}

        <main className={getMainContentClass()}>
          {renderContent()}
        </main>
      </div>
      <Footer 
        onAboutClick={() => setCurrentPage('about')}
        onHelpClick={() => setCurrentPage('about')}
        onContactsClick={() => setCurrentPage('about')}
      />
    </div>
  );
};

// Обертка с провайдером аутентификации
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;