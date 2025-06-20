import prisma from '~/lib/prisma';
import { type ServerFile } from 'nuxt-file-storage';

export default defineEventHandler(async (event) => {
  const { productId, files } = await readBody<{ productId: string; files: ServerFile[] }>(event);

  // Валидация
  if (!productId || !files.length) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка загрузки изображения товара',
    });
  }

  // Проходимся по изображениям
  for (const file of files) {
    // Проверяем расширение файла
    const { binaryString, ext } = parseDataUrl(file.content);
    const allowedTypes = /png|jpg|jpeg|gif|webp|avif/;
    const isImageTypeValid = allowedTypes.test(ext);

    if (!isImageTypeValid) {
      throw createError({
        statusCode: 400,
        message: 'Неверное расширение файла',
      });
    }

    // Проверяем размер файла
    const isImageSizeValid = +file.size <= 2 * 1024 * 1024; // меньше либо равно 2мб

    if (!isImageSizeValid) {
      throw createError({
        statusCode: 400,
        message: 'Размер изображения более 2МБ',
      });
    }

    // Сохранение изображения в папке public/uploads
    const nameFile = await storeFileLocally(file, 16, '/');

    // Загрузка названия файла в БД
    await prisma.image.create({
      data: {
        productId,
        url: nameFile,
      },
    });
  }

  // Возвращаем значения
  return {
    message: 'Изображение загружено',
  };
});
