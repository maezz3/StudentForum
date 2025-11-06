// WelcomePage.jsx - адаптированная версия
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/common/Logo/Logo';
import Icon from '../../components/common/Icon/Icon';
import styles from './WelcomePage.module.css';

const WelcomePage = ({ onNavigate }) => {
  const { user } = useAuth();

  const handleGetStarted = () => {
    onNavigate('auth');
  };

  const handleLearnMore = () => {
    onNavigate('about');
  };

  // Если пользователь авторизован, не показываем Welcome
  if (user) {
    return null;
  }

  return (
    <div className={styles.welcomePage}>
      <div className={styles.container}>
        {/* Hero секция */}
        <div className={styles.hero}>
          <Logo size={80} withText={true} />
          <h1 className={styles.title}>Добро пожаловать на Студенческий форум</h1>
          <p className={styles.subtitle}>
            Единая платформа для общения, обучения и взаимодействия студентов и преподавателей
          </p>
          
          <div className={styles.actions}>
            <button 
              className={styles.primaryButton}
              onClick={handleGetStarted}
            >
              <Icon name="LogIn" size={20} />
              Начать использовать
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={handleLearnMore}
            >
              <Icon name="Info" size={20} />
              Узнать больше
            </button>
          </div>
        </div>

        {/* Features секция */}
        <div className={styles.features}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="Users" size={40} />
              </div>
              <h3>Учебные группы</h3>
              <p>Присоединяйтесь к группам по предметам и интересам</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="MessageCircle" size={40} />
              </div>
              <h3>Групповые чаты</h3>
              <p>Общайтесь с одногруппниками и преподавателями в реальном времени</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="Calendar" size={40} />
              </div>
              <h3>Календарь событий</h3>
              <p>Никогда не пропускайте дедлайны и важные мероприятия</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="Megaphone" size={40} />
              </div>
              <h3>Объявления</h3>
              <p>Важные уведомления от преподавателей и администрации</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="Folder" size={40} />
              </div>
              <h3>Файловое хранилище</h3>
              <p>Обменивайтесь учебными материалами и проектами</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="GraduationCap" size={40} />
              </div>
              <h3>Академическая среда</h3>
              <p>Создано студентами для студентов</p>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className={styles.cta}>
          <h2>Готовы присоединиться?</h2>
          <p>Создайте аккаунт и начните использовать все возможности платформы</p>
          <button 
            className={styles.ctaButton}
            onClick={handleGetStarted}
          >
            <Icon name="UserPlus" size={20} />
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;