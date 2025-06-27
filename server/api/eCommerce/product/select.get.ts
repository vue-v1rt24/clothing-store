import prisma from '~/lib/prisma';

// id крайнего запроса (для постраничной навигации)
let cursorId: string | undefined;

export default defineEventHandler(async (event) => {
  const { search, more } = getQuery(event) as {
    search: string;
    more: string;
  };

  // Сброс курсора постраничной навигации
  if (!more) {
    cursorId = undefined;
  }

  // Запрос на получение товаров
  const products = await prisma.product.findMany({
    take: 2,
    skip: cursorId ? 1 : 0,
    cursor: cursorId ? { id: cursorId } : undefined,
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    omit: {
      categoryId: true,
      colorId: true,
      createdAt: true,
      updatedAt: true,
    },
    include: {
      color: {
        select: {
          name: true,
        },
      },
      image: {
        select: {
          url: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Запрос на получение категорий
  const categoriesData = await prisma.category.findMany();

  // Запрос на получение цветов
  const colorsData = await prisma.color.findMany();

  // Установка курсора для постраничной навигации
  cursorId = products[1]?.id;
  // console.log('cursorId: ', cursorId);

  // Возвращаем значения
  return {
    items: products,
    cursorId,
  };
});
