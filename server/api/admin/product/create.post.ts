import prisma from '~/lib/prisma';
import slugify from 'slugify';
import { productSchema } from '~/server/utils/product/validate.utils';
import type { TypeProduct } from '~/server/types/product.types';

export default defineEventHandler(async (event) => {
  const { name, colorId, price, categoryId } = await readBody<TypeProduct>(event);

  // Валидация
  const res = productSchema.safeParse({ name, colorId, price, categoryId });

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка данных создания товара',
      data: zShowError<TypeProduct>(res.error),
    });
  }

  // Проверка существования категории
  const productExist = await prisma.product.findUnique({
    where: {
      name,
    },
  });

  if (productExist) {
    throw createError({
      statusCode: 400,
      message: 'Такой товар уже существует',
      data: ['Такой товар уже существует'],
    });
  }

  // Создание категории
  const product = await prisma.product.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      colorId,
      price,
      categoryId,
    },
  });

  // Возвращаем значения
  return {
    message: 'Товар создан',
    product,
  };
});
