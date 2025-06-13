// Типизация данных формы
export type TypeForm = {
  name: string;
  email: string;
  password: string;
};

// Обновление записи пользователя, после подтверждения почты
export type TypeOptCode = {
  email: string;
  optCode: string;
};

// Для подтверждения почты
export const UserEmailType = {
  InvalidEmail: 0,
  ValidEmail: 1,
} as const;

export type TypeUserEmailType = (typeof UserEmailType)[keyof typeof UserEmailType];
