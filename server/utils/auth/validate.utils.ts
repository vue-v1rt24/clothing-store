import { z } from 'zod/v4';

// Проверка
export const loginSchemaRegister = z.object({
  name: z.string().min(3, 'Длина имени не менее 3 символов'),
  email: z.email('Неправильная почта'),
  password: z.string().min(6, 'Длина пароля не менее 6 символов'),
});

export const loginSchemaLogin = z.object({
  email: z.email('Неправильная почта'),
  password: z.string().min(6, 'Длина пароля не менее 6 символов'),
});
