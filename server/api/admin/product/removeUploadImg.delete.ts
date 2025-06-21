import prisma from '~/lib/prisma';
import { deleteProductImgSchema } from '~/server/utils/product/validate.utils';

export default defineEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event);

  // Валидация
  const res = deleteProductImgSchema.safeParse({ id });

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при удалении изображения',
    });
  }

  // Удаление изображения товара
  const imageData = await prisma.image.delete({
    where: {
      id,
    },
  });

  // Удаление изображения из файловой системы
  try {
    await deleteFile(imageData.url, '/');
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка при удалении изображения из файловой системы',
    });
  }

  // Возвращаем значения
  return {
    message: 'Изображение удалёно',
  };
});
