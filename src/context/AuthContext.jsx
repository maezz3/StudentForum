import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService'; // Добавляем импорт

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
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.logout();
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (updates) => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
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