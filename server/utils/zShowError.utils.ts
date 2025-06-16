import { z, type ZodError } from 'zod/v4';

// Вывод ошибок
export const zShowError = <T>(errors: ZodError<T>) => {
  const resDataErrors = z.treeifyError(errors);
  const resErrors = [];

  for (const key in resDataErrors.properties) {
    for (const error of resDataErrors.properties[key].errors) {
      resErrors.push(error);
    }
  }

  return resErrors;
};
