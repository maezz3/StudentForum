export const mockUsers = [
  {
    id: 1,
    username: 'student123',
    fullname: 'Иван Иванов',
    role: 'student',
    avatar: '',
    status: 'Студент МАИ'
  },
  {
    id: 2,
    username: 'teacher_pro',
    fullname: 'Мария Петрова',
    role: 'teacher', 
    avatar: '',
    status: 'Преподаватель баз данных'
  }
]

// Группы с встроенными чатами и календарями
export const mockGroups = [
  {
    id: 1,
    university_id: 1,
    title: 'М8О-305Б-23',
    description: 'Группа по базам данных 2023 года',
    code: 'M8O305B23',
    type: 'open',
    avatar: '',
    // Встроенные сущности группы:
    chat: {
      id: 1,
      group_id: 1,
      messages: [] // сообщения этого чата
    },
    calendar: {
      id: 1,
      group_id: 1,
      events: [] // события этого календаря
    },
    announcements: [] // объявления группы
  },
  {
    id: 2,
    university_id: 1, 
    title: 'Авиационные системы',
    description: 'Обсуждение авиационных технологий',
    code: 'AVIASYSTEMS',
    type: 'private',
    avatar: '',
    chat: {
      id: 2,
      group_id: 2,
      messages: []
    },
    calendar: {
      id: 2, 
      group_id: 2,
      events: []
    },
    announcements: []
  }
];

// Отдельные события (могут быть в нескольких календарях)
export const mockEvents = [
  {
    id: 1,
    title: 'Новый год',
    description: 'Празднование нового года',
    datetime: '2024-12-31T23:00:00Z',
    // Может быть в календарях нескольких групп
    calendar_ids: [1, 2] 
  },
  {
    id: 2,
    title: 'Дедлайн ЛР1',
    description: 'Сдача первой лабораторной работы',
    datetime: '2024-02-01T23:59:00Z',
    calendar_ids: [1] // Только в календаре группы БД
  }
];