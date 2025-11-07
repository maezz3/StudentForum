import { apiService } from './apiService';

export const groupService = {
  // Получить список групп пользователя
  async getUserGroups() {
    return apiService.get(`/users/me/groups`);
  },

  // Получить информацию о группе
  async getGroup(groupId) {
    return apiService.get(`/groups/${groupId}`);
  },

  // Вступить в группу
  async joinGroup(groupId, inviteCode = null) {
    return apiService.post(`/groups/${groupId}/join`, {
      invite_code: inviteCode
    });
  },

  // Покинуть группу
  async leaveGroup(groupId) {
    return apiService.post(`/groups/${groupId}/leave`);
  },

  // Получить участников группы
  async getGroupMembers(groupId) {
    return apiService.get(`/groups/${groupId}/members`);
  }
};