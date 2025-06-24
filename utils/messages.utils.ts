const messageItems = {
  login: 'Сеанс прошёл. Авторизуйтесь!',
  logout: 'Вы вышли из системы',
} as const;

export type TypeMessages = keyof typeof messageItems;

export const messages = (title: TypeMessages) => {
  return messageItems[title] || 'Неизвестный параметр';
};
