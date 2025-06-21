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
  const product = await prisma.product.delete({
    where: {
      id,
    },
    include: {
      image: true,
    },
  });

  // Удаляем изображения из файловой системы
  for (const item of product.image) {
    await deleteFile(item.url, '/');
  }

  // Возвращаем значения
  return {
    message: 'Товар удалён',
  };
});
