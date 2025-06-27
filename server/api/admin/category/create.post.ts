import prisma from '~/lib/prisma';
import slugify from 'slugify';
import type { TypeCategory } from '~/server/types/category.types';
import { categorySchema } from '~/server/utils/category/validate.utils';

export default defineEventHandler(async (event) => {
  const { name } = await readBody<TypeCategory>(event);

  // Валидация
  const res = categorySchema.safeParse({ name });

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка данных создания категории',
      data: zShowError<TypeCategory>(res.error),
    });
  }

  // Проверка существования категории
  const categoryExist = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (categoryExist) {
    throw createError({
      statusCode: 400,
      message: 'Такая категория уже существует',
      data: ['Такая категория уже существует'],
    });
  }

  // Создание категории
  const category = await prisma.category.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });

  // Возвращаем значения
  return {
    message: 'Категория создана',
    category,
  };
});
