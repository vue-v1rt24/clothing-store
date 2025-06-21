import { z } from 'zod/v4';

export const productSchema = z.object({
  name: z.string().min(3, 'Длина названия товара не менее 3 символов'),
  color: z.string().min(3, 'Длина названия цвета не менее 3 символов'),
  price: z.number().positive('Стоимость должна быть больше 0'),
  categoryId: z.string(),
});

export const deleteProductSchema = z.object({
  id: z.string(),
});

export const deleteProductImgSchema = z.object({
  id: z.string(),
});
