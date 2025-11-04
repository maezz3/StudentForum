import { apiService } from './apiService';

export const calendarService = {
  // Получить события календаря
  async getEvents(calendarId, startDate, endDate) {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    return apiService.get(`/calendars/${calendarId}/events?${params}`);
  },

  // Создать событие
  async createEvent(eventData) {
    return apiService.post('/events', eventData);
  },

  // Обновить событие
  async updateEvent(eventId, eventData) {
    return apiService.put(`/events/${eventId}`, eventData);
  },

  // Удалить событие
  async deleteEvent(eventId) {
    return apiService.delete(`/events/${eventId}`);
  }
};