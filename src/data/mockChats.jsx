export const mockChats = [
  {
    id: 1,
    group_id: 1,
    title: 'М8О-305Б-23 - Общий чат',
    type: 'group',
    unread: 3,
    lastMessage: 'Привет, как дела с лабораторной?'
  },
  {
    id: 2,
    group_id: 2,
    title: 'Авиационные системы',
    type: 'group', 
    unread: 0,
    lastMessage: 'Завтра собрание в 10:00'
  }
];

export const mockMessages = [
  {
    id: 1,
    chat_id: 1,
    sender: {
      id: 2,
      username: 'maria_prof',
      fullname: 'Мария Петрова',
      avatar: '',
      role: 'teacher'
    },
    text: 'Добро пожаловать в чат группы! Напоминаю, что дедлайн по ЛР1 - до конца недели.',
    datetime: '2024-01-15T10:30:00Z',
    type: 'text'
  },
  {
    id: 2,
    chat_id: 1,
    sender: {
      id: 3,
      username: 'alex_student',
      fullname: 'Алексей Смирнов',
      avatar: '',
      role: 'student'
    },
    text: 'Привет! У кого-то есть пример выполнения первого задания?',
    datetime: '2024-01-15T11:15:00Z',
    type: 'text'
  },
  {
    id: 3,
    chat_id: 1,
    sender: {
      id: 1,
      username: 'student123', 
      fullname: 'Иван Иванов',
      avatar: '',
      role: 'student'
    },
    text: 'Я начал делать, если что могу помочь 👍',
    datetime: '2024-01-15T11:20:00Z',
    type: 'text'
  }
];

export const currentUser = {
  id: 1,
  username: 'student123',
  fullname: 'Иван Иванов',
  avatar: '',
  role: 'student'
};