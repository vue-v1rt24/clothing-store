import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { productSlug } = getQuery(event);

  // Получаем все товары по категории
  const products = await prisma.product.findMany({
    where: {
      categoryId: id,
      slug: {
        not: productSlug as string,
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      image: {
        select: {
          url: true,
        },
      },
      color: {
        select: {
          name: true,
        },
      },
    },
  });

  //
  return products;
});
