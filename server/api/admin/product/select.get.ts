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

  // Запрос
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
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
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

  // Установка курсора для постраничной навигации
  cursorId = products[1]?.id;
  // console.log('cursorId: ', cursorId);

  // Возвращаем значения
  return {
    products,
    cursorId,
  };
});
