import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState({
    id: 1,
    username: 'ivan_student',
    fullname: 'Иван Иванов',
    email: 'ivan@mai.ru',
    role: 'student',
    avatar: '',
    status: 'Студент МАИ',
    registered_at: '2024-09-01T00:00:00Z'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // Здесь будет вызов API для сохранения
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h1>Профиль пользователя</h1>
        <p>Управление вашей учетной записью и настройками</p>
      </div>

      <div className={styles.profileContent}>
        {/* Боковая панель с навигацией */}
        <div className={styles.sidebar}>
          <nav className={styles.nav}>
            <button className={`${styles.navItem} ${styles.navItemActive}`}>
              👤 Основная информация
            </button>
            <button className={styles.navItem}>
              🔐 Безопасность
            </button>
            <button className={styles.navItem}>
              🔔 Уведомления
            </button>
            <button className={styles.navItem}>
              🎨 Внешний вид
            </button>
          </nav>
        </div>

        {/* Основная информация */}
        <div className={styles.mainContent}>
          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <h2>Основная информация</h2>
              {!isEditing ? (
                <button 
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Редактировать
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button 
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    Отмена
                  </button>
                  <button 
                    className={styles.saveButton}
                    onClick={handleSave}
                  >
                    Сохранить
                  </button>
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              {/* Аватар */}
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullname} />
                  ) : (
                    <span>{user.fullname.charAt(0)}</span>
                  )}
                </div>
                {isEditing && (
                  <button className={styles.changeAvatarButton}>
                    Сменить аватар
                  </button>
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoSection}>
                <div className={styles.formGroup}>
                  <label>Имя пользователя</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <div className={styles.infoValue}>@{user.username}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>ФИО</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) => handleChange('fullname', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <div className={styles.infoValue}>{user.fullname}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={styles.input}
                    />
                  ) : (
                    <div className={styles.infoValue}>{user.email}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Статус</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className={styles.input}
                      placeholder="Расскажите о себе..."
                    />
                  ) : (
                    <div className={styles.infoValue}>{user.status}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Роль</label>
                  <div className={styles.roleBadge}>
                    {user.role === 'student' && '🎓 Студент'}
                    {user.role === 'teacher' && '👨‍🏫 Преподаватель'}
                    {user.role === 'guest' && '👤 Гость'}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Дата регистрации</label>
                  <div className={styles.infoValue}>
                    {formatDate(user.registered_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className={styles.statsCard}>
            <h3>Статистика активности</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>5</div>
                <div className={styles.statLabel}>Групп</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>127</div>
                <div className={styles.statLabel}>Сообщений</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>8</div>
                <div className={styles.statLabel}>Файлов</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>23</div>
                <div className={styles.statLabel}>Событий</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;