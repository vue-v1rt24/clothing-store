import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { search, page, limit } = getQuery(event) as {
    search: string;
    page: number;
    limit: number;
  };

  const products = await prisma.product.findMany({
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
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Возвращаем значения
  return {
    products,
  };
});
