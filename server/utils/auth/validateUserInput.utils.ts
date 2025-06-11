import { z, treeifyError, type ZodError } from 'zod/v4';
import { TypeForm } from '~/server/types/auth.types';

// z.config(z.locales.ru());

// Проверка
export const loginSchema = z.object({
  email: z.email('Неправильная почта'),
  password: z.string().min(6, 'Длина пароля не менее 6 символов'),
});

// Вывод ошибок
export const zShowError = (errors: ZodError<TypeForm>) => {
  const resDataErrors = z.treeifyError(errors);
  const resErrors = [];

  for (const key in resDataErrors.properties) {
    for (const error of resDataErrors.properties[key].errors) {
      resErrors.push(error);
    }
  }

  return resErrors;
};
