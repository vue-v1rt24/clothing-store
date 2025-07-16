import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  // Запрос на получение минимальной и максимальной цены
  const priceMinMax = await prisma.product.aggregate({
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  // Категории
  const categories = await prisma.category.findMany();

  // Цвета
  const colors = await prisma.color.findMany();

  // Возвращаем значения
  return {
    priceMinMax: [priceMinMax._min.price, priceMinMax._max.price],
    categories,
    colors,
  };
});
