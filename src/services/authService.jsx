import { apiService } from './apiService';

export const authService = {
  // Вход пользователя
  async login(credentials) {
    const response = await apiService.post('/auth/login', credentials);
    
    // Сохраняем токен в apiService
    if (response.token) {
      apiService.setToken(response.token);
    }
    
    return response;
  },

  // Регистрация пользователя
  async register(userData) {
    const response = await apiService.post('/auth/register', userData);
    
    // Сохраняем токен в apiService
    if (response.token) {
      apiService.setToken(response.token);
    }
    
    return response;
  },

  // Получение профиля пользователя
  async getProfile() {
    return await apiService.get('/auth/profile');
  },

  // Выход пользователя
  logout() {
    apiService.setToken(null);
    localStorage.removeItem('auth_token');
  },

  // Обновление профиля
  async updateProfile(profileData) {
    return await apiService.put('/auth/profile', profileData);
  },

  // Смена пароля
  async changePassword(passwordData) {
    return await apiService.put('/auth/password', passwordData);
  }
};