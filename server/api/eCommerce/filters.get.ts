import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  // Категории
  const categories = await prisma.category.findMany();

  // Цвета
  const colors = await prisma.color.findMany();

  // Возвращаем значения
  return {
    categories,
    colors,
  };
});
