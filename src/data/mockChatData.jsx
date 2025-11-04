export const currentUser = {
  id: 1,
  username: 'ivan_student',
  fullname: 'Иван Иванов',
  avatar: '',
  role: 'student',
  status: 'online'
};

export const mockUsers = [
  currentUser,
  {
    id: 2,
    username: 'maria_prof',
    fullname: 'Мария Петрова',
    avatar: '',
    role: 'teacher',
    status: 'online'
  },
  {
    id: 3,
    username: 'alex_code',
    fullname: 'Алексей Смирнов',
    avatar: '',
    role: 'student',
    status: 'offline'
  },
  {
    id: 4,
    username: 'anna_tech',
    fullname: 'Анна Козлова',
    avatar: '',
    role: 'student',
    status: 'online'
  }
];

export const mockMessages = [
  {
    id: 1,
    chat_id: 1,
    sender: mockUsers[1], // Мария Петрова
    text: 'Добро пожаловать в чат группы М8О-305Б-23! 🎓 Напоминаю, что дедлайн по лабораторной работе №1 - до конца недели.',
    datetime: '2024-01-20T09:00:00Z',
    type: 'text',
    isEdited: false
  },
  {
    id: 2,
    chat_id: 1,
    sender: mockUsers[2], // Алексей Смирнов
    text: 'Добрый день! У кого-то есть пример выполнения первого задания? Не совсем понимаю третий пункт',
    datetime: '2024-01-20T10:15:00Z',
    type: 'text',
    isEdited: false
  },
  {
    id: 3,
    chat_id: 1,
    sender: mockUsers[0], // Иван Иванов (current user)
    text: 'Я начал делать, если что могу помочь 👍 В третьем пункте нужно использовать JOIN между таблицами users и groups',
    datetime: '2024-01-20T10:20:00Z',
    type: 'text',
    isEdited: false
  },
  {
    id: 4,
    chat_id: 1,
    sender: mockUsers[3], // Анна Козлова
    text: 'Присоединяюсь к вопросу! И еще: какие СУБД мы рассматриваем в работе? Только PostgreSQL?',
    datetime: '2024-01-20T10:25:00Z',
    type: 'text',
    isEdited: false
  },
  {
    id: 5,
    chat_id: 1,
    sender: mockUsers[1], // Мария Петрова
    text: 'Отвечаю на вопросы:\n1. Примеры будут на следующем занятии\n2. Работаем с PostgreSQL, но можете использовать MySQL если удобнее\n3. JOIN - правильное решение для 3 пункта ✅',
    datetime: '2024-01-20T10:30:00Z',
    type: 'text',
    isEdited: false
  },
  {
    id: 6,
    chat_id: 1,
    sender: mockUsers[0], // Иван Иванов
    text: 'Спасибо за пояснения! Тогда продолжаю работу 🚀',
    datetime: '2024-01-20T10:35:00Z',
    type: 'text',
    isEdited: false
  }
];