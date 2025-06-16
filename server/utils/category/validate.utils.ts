import { z } from 'zod/v4';

export const categorySchema = z.object({
  name: z.string().min(3, 'Длина названия категории не менее 3 символов'),
});

export const categorySchema2 = z.object({
  id: z.string('Не правильный ID'),
  name: z.string().min(3, 'Длина названия категории не менее 3 символов'),
});
