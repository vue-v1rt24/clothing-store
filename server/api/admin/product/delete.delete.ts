import prisma from '~/lib/prisma';
import { deleteProductSchema } from '~/server/utils/product/validate.utils';

export default defineEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event);

  // Валидация
  const res = deleteProductSchema.safeParse({ id });

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при удалении товара',
      data: zShowError(res.error),
    });
  }

  // Обновление товара
  await prisma.product.delete({
    where: {
      id,
    },
  });

  // Возвращаем значения
  return {
    message: 'Товар удалён',
  };
});
