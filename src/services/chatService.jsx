import { apiService } from './apiService';

export const chatService = {
  // Получить список чатов пользователя
  async getChats() {
    return apiService.get('/chats');
  },

  // Получить сообщения чата
  async getMessages(chatId, page = 1, limit = 50) {
    return apiService.get(`/chats/${chatId}/messages?page=${page}&limit=${limit}`);
  },

  // Отправить сообщение
  async sendMessage(chatId, text, fileId = null) {
    return apiService.post('/messages', {
      chat_id: chatId,
      text,
      file_id: fileId,
      type: fileId ? 'file' : 'text'
    });
  },

  // Пометить сообщения как прочитанные
  async markAsRead(chatId, messageIds) {
    return apiService.post(`/chats/${chatId}/read`, {
      message_ids: messageIds
    });
  }
};