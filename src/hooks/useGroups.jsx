import { useState, useEffect, useCallback } from 'react';
import { groupService } from '../services/groupService';

export const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userGroups = await groupService.getUserGroups();
      setGroups(userGroups);
      
      // Моковые данные
      /* const userGroups = [
        {
          id: 1,
          university_id: 1,
          title: 'М8О-305Б-23',
          description: 'Группа 8 института МАИ по направлению "Прикладная математика". Обсуждение лабораторных работ и проектов.',
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
      ]; */
    } catch (err) {
      setError(err.message);
      console.error('Failed to load groups:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const joinGroup = useCallback(async (groupId, inviteCode = null) => {
    try {
      
      await groupService.joinGroup(groupId, inviteCode);
      
      await loadGroups();

    } catch (err) {
      console.error('Failed to join group:', err);
      throw err;
    }
  }, [loadGroups]);

  const leaveGroup = useCallback(async (groupId) => {
    try {
      await groupService.leaveGroup(groupId);
      await loadGroups(); // Перезагружаем список групп
    } catch (err) {
      console.error('Failed to leave group:', err);
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