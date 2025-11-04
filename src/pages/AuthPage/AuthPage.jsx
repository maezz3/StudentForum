import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPage.module.css';
import Logo from '../../components/common/Logo/Logo';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация пароля (мин 8 символов, хотя бы 1 цифра и 1 буква)
  const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    return password.length >= 8 && hasNumber.test(password) && hasLetter.test(password);
  };

  // Валидация username (только латиница, цифры и подчеркивание)
  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]+$/;
    return re.test(username);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Валидация в реальном времени
    let error = '';
    
    if (name === 'email') {
      error = value && !validateEmail(value) ? 'Некорректный формат email' : '';
    } else if (name === 'password') {
      error = value && !validatePassword(value) 
        ? 'Пароль должен содержать минимум 8 символов, включая цифру и букву' 
        : '';
    } else if (name === 'confirmPassword') {
      error = value && value !== formData.password ? 'Пароли не совпадают' : '';
    } else if (name === 'username') {
      error = value && !validateUsername(value) 
        ? 'Имя пользователя может содержать только латинские буквы, цифры и подчеркивание' 
        : '';
    } else if (name === 'fullname') {
      error = value && value.length < 2 ? 'ФИО должно содержать минимум 2 символа' : '';
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Общие проверки для всех форм
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Некорректный формат email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, включая цифру и букву';
      isValid = false;
    }

    // Для регистрации - дополнительные проверки
    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = 'Имя пользователя обязательно';
        isValid = false;
      } else if (!validateUsername(formData.username)) {
        newErrors.username = 'Имя пользователя может содержать только латинские буквы, цифры и подчеркивание';
        isValid = false;
      } else if (formData.username.length < 3) {
        newErrors.username = 'Имя пользователя должно содержать минимум 3 символа';
        isValid = false;
      }

      if (!formData.fullname) {
        newErrors.fullname = 'ФИО обязательно';
        isValid = false;
      } else if (formData.fullname.length < 2) {
        newErrors.fullname = 'ФИО должно содержать минимум 2 символа';
        isValid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Подтвердите пароль';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // Моковый вход
        const mockUser = {
          id: 1,
          username: formData.email.split('@')[0], // Генерируем username из email
          fullname: 'Тестовый Пользователь',
          email: formData.email,
          role: 'guest', // По умолчанию гость
          avatar: '',
          status: 'Новый пользователь',
          registered_at: new Date().toISOString()
        };
        
        login(mockUser);
      } else {
        // Моковая регистрация
        const newUser = {
          id: Date.now(),
          username: formData.username,
          fullname: formData.fullname,
          email: formData.email,
          role: 'guest', // Все новые пользователи - гости
          avatar: '',
          status: 'Новый пользователь',
          registered_at: new Date().toISOString()
        };
        
        register(newUser);
      }
    } catch (err) {
      setApiError(err.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  // Если пользователь уже авторизован, показываем сообщение
  if (isAuthenticated) {
    return (
      <div className={styles.authPage}>
        <div className={styles.alreadyAuthed}>
          <div className={styles.successIcon}>✅</div>
          <h2>Вы уже авторизованы!</h2>
          <p>Перейдите на главную страницу для продолжения работы.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <div className={styles.logo}>
            <Logo size={48} withText={false} />
            <h2>{isLogin ? 'Вход в Студенческий форум' : 'Регистрация'}</h2>
          </div>
          <p>{isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}</p>
        </div>
        
        {apiError && (
          <div className={styles.errorMessage}>
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLogin && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="username">Имя пользователя *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? styles.invalid : ''}
                  placeholder="ivan_student"
                />
                {errors.username && (
                  <span className={styles.errorText}>{errors.username}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="fullname">ФИО *</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={errors.fullname ? styles.invalid : ''}
                  placeholder="Иван Иванов"
                />
                {errors.fullname && (
                  <span className={styles.errorText}>{errors.fullname}</span>
                )}
              </div>
            </>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.invalid : ''}
              placeholder="ivan@example.com"
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.invalid : ''}
              placeholder="Минимум 8 символов"
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>
          
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Подтвердите пароль *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.invalid : ''}
                placeholder="Повторите пароль"
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>{errors.confirmPassword}</span>
              )}
            </div>
          )}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className={styles.switchAuth}>
          <p>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button 
              type="button"
              className={styles.switchButton}
              onClick={() => {
                setIsLogin(!isLogin);
                setApiError('');
                setErrors({});
                setFormData({
                  username: '',
                  fullname: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
            >
              {isLogin ? ' Зарегистрироваться' : ' Войти'}
            </button>
          </p>
        </div>

        <div className={styles.roleInfo}>
          <p>
            💡 <strong>Все новые пользователи получают роль "Гость"</strong>
            <br />
            Для получения роли "Студент" или "Преподаватель" обратитесь к администрации
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;