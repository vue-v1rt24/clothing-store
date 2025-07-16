import prisma from '~/lib/prisma';

// id крайнего запроса (для постраничной навигации)
let cursorId: string | undefined;

export default defineEventHandler(async (event) => {
  const { params, more } = getQuery(event) as {
    params: string;
    more: string;
  };

  // Распарсивание параметра поиска
  const searchParams = params ? JSON.parse(params) : {};

  // Сброс курсора постраничной навигации
  if (!more) {
    cursorId = undefined;
  }

  // Запрос на получение товаров
  const productsData = await prisma.product.findMany({
    take: 2,
    skip: cursorId ? 1 : 0,
    cursor: cursorId ? { id: cursorId } : undefined,
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      color: true,
      image: {
        select: {
          id: true,
          url: true,
          productId: true,
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

  // Ждём, пока соберутся все
  const [products, categories, colors] = await Promise.all([
    productsData,
    categoriesData,
    colorsData,
  ]);

  // Установка курсора для постраничной навигации
  cursorId = products[1]?.id;
  // console.log('cursorId: ', cursorId);

  // Возвращаем значения
  return {
    items: products,
    cursorId,
    categories,
    colors,
  };
});
