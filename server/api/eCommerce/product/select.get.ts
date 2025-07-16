import prisma from '~/lib/prisma';

// id крайнего запроса (для постраничной навигации)
let cursorId: string | undefined;

export default defineEventHandler(async (event) => {
  const { params, more } = getQuery(event) as { params: string; more: string };

  // Разбор гет-параметров из json строки
  const { search, prices, categories, colors } = JSON.parse(params) as {
    search: string;
    prices: string;
    categories: string;
    colors: string;
  };

  const pricesParams = prices ? (JSON.parse(prices) as number[]) : undefined;
  const categoriesParams = categories ? (JSON.parse(categories) as string[]) : undefined;
  const colorsParams = colors ? (JSON.parse(colors) as string[]) : undefined;

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
      price: pricesParams?.length ? { gte: pricesParams[0], lte: pricesParams[1] } : undefined,
      categoryId: categoriesParams?.length ? { in: categoriesParams } : undefined,
      colorId: colorsParams?.length ? { in: colorsParams } : undefined,
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

  // Если товаров нет, то возвращаем ошибку
  if (!products.length) {
    throw createError({
      statusCode: 400,
      message: 'Товаров нет',
    });
  }

  // Установка курсора для постраничной навигации
  cursorId = products[1]?.id;
  // console.log('cursorId: ', cursorId);

  // Возвращаем значения
  return {
    items: products,
    cursorId,
  };
});
