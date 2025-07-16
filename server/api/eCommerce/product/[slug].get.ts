import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  // Получаем товар по slug
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
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

  // Проверяем, существует ли товар
  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Товар не найден',
    });
  }

  // Получаем все товары по категории
  const productsCategory = await event.$fetch(
    `/api/eCommerce/product/category/${product.category.id}`,
    {
      query: {
        productSlug: slug,
      },
    },
  );

  //
  return {
    product,
    productsCategory,
  };
});
