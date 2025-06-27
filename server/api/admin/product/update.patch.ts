import prisma from '~/lib/prisma';
import slugify from 'slugify';
import { TypeProduct } from '~/server/types/product.types';
import { productSchema } from '~/server/utils/product/validate.utils';

export default defineEventHandler(async (event) => {
  const { id, name, colorId, price, categoryId } = await readBody<TypeProduct>(event);

  // Валидация
  const res = productSchema.safeParse({ name, colorId, price, categoryId });

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка данных обновления товара',
      data: zShowError<TypeProduct>(res.error),
    });
  }

  // Обновление товара
  const product = await prisma.product.update({
    where: {
      id,
    },
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
    message: 'Товар изменён',
    product,
  };
});
