import prisma from '~/lib/prisma';
import slugify from 'slugify';
import type { TypeCategory } from '~/server/types/category.types';
import { categorySchema2 } from '~/server/utils/category/validate.utils';

export default defineEventHandler(async (event) => {
  const { id, name } = await readBody<TypeCategory>(event);

  // Валидация
  const res = categorySchema2.safeParse({ id, name });

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка данных обновления категории',
      data: zShowError<TypeCategory>(res.error),
    });
  }

  // Обновление категории
  const category = await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });

  // Возвращаем значения
  return {
    message: 'Категория изменена',
    category,
  };
});
