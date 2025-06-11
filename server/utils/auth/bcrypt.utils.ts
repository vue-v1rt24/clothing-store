import bcrypt from 'bcrypt';

// Кэшируем пароль
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Сравниваем пароль
export const comparePassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};
