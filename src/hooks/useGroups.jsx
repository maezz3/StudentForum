import { useState, useEffect, useCallback } from 'react';
//import { groupService } from '../services/groupService';

export const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      // Временно используем моковые данные
      // const userGroups = await groupService.getUserGroups();
      
      // Моковые данные
      const userGroups = [
        {
          id: 1,
          university_id: 1,
          title: 'М8О-305Б-23',
          description: 'Группа по базам данных 2023 года. Обсуждение лабораторных работ и проектов.',
          code: 'M8O305B23',
          type: 'open',
          avatar: '',
          chat: { id: 1, group_id: 1, title: 'М8О-305Б-23 - Общий чат' },
          calendar: { id: 1, group_id: 1, events: [] },
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
          chat: { id: 2, group_id: 2, title: 'Авиационные системы - Чат' },
          calendar: { id: 2, group_id: 2, events: [] },
          announcements: []
        }
      ];
      setGroups(userGroups);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const joinGroup = useCallback(async (groupId, inviteCode = null) => {
    try {
      // Временно имитируем успешное вступление
      // await groupService.joinGroup(groupId, inviteCode);
      
      console.log(`Joining group ${groupId} with code: ${inviteCode}`);
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем список групп
      await loadGroups();
    } catch (err) {
      throw err;
    }
  }, [loadGroups]);

  const leaveGroup = useCallback(async (groupId) => {
    try {
      // await groupService.leaveGroup(groupId);
      await loadGroups(); // Перезагружаем список групп
    } catch (err) {
      throw err;
    }
  }, [loadGroups]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return {
    groups,
    loading,
    error,
    joinGroup,
    leaveGroup,
    refresh: loadGroups
  };
};