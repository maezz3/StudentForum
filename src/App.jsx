import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/common/Header/Header';
import Sidebar from './components/common/Sidebar/Sidebar';
import Footer from './components/common/Footer/Footer';
import './App.css';

// Импортируем страницы
import GroupsPage from './pages/GroupsPage/GroupsPage';
import ChatPage from './pages/ChatPage/ChatPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import AnnouncementsPage from './pages/AnnouncementsPage/AnnouncementsPage';
import FilesPage from './pages/FilesPage/FilesPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';


// Моковые данные
const mockGroups = [
  {
    id: 1,
    university_id: 1,
    title: 'М8О-305Б-23',
    description: 'Группа по базам данных 2023 года. Обсуждение лабораторных работ и проектов.',
    code: 'M8O305B23',
    type: 'open',
    avatar: '',
    chat: {
      id: 1,
      group_id: 1,
      title: 'М8О-305Б-23 - Общий чат'
    },
    calendar: {
      id: 1,
      group_id: 1,
      events: []
    },
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
    chat: {
      id: 2,
      group_id: 2,
      messages: []
    },
    calendar: {
      id: 2,
      group_id: 2,
      events: []
    },
    announcements: []
  }
];

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('groups');
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Показываем загрузку
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Если пользователь не авторизован, показываем страницу авторизации
  if (!user) {
    return <AuthPage />;
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
    if (!selectedGroup && currentPage !== 'groups' && currentPage !== 'profile') {
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
      case 'profile':
        return <ProfilePage />;
      case 'groups':
        return (
          <GroupsPage 
            groups={mockGroups}
            onSelectGroup={handleSelectGroup}
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
      <Header />
      <div className="app-body">
        <Sidebar 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          selectedGroup={selectedGroup}
        />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Обертка с провайдером аутентификации
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;