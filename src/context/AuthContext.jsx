import React, { createContext, useState, useContext, useEffect } from 'react';

export const USER_ROLES = {
  GUEST: 'guest',
  STUDENT: 'student', 
  TEACHER: 'teacher',
  ADMIN: 'admin'
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка пользователя при старте приложения
  useEffect(() => {
    const storedUser = localStorage.getItem('forum_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithRole = {
      ...userData,
      role: userData.role || USER_ROLES.GUEST // По умолчанию гость
    };
    setUser(userWithRole);
    localStorage.setItem('forum_user', JSON.stringify(userWithRole));
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      username: userData.username,
      fullname: userData.fullname,
      email: userData.email,
      role: USER_ROLES.GUEST, // Все новые пользователи - гости
      avatar: '',
      status: 'Новый пользователь',
      registered_at: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('forum_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forum_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('forum_user', JSON.stringify(updatedUser));
  };

  const updateRole = (newRole) => {
    if (user && Object.values(USER_ROLES).includes(newRole)) {
      updateUser({ role: newRole });
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    updateRole,
    isAuthenticated: !!user,
    isGuest: user?.role === USER_ROLES.GUEST,
    isStudent: user?.role === USER_ROLES.STUDENT,
    isTeacher: user?.role === USER_ROLES.TEACHER,
    isAdmin: user?.role === USER_ROLES.ADMIN,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};