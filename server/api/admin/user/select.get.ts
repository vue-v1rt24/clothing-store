import prisma from '~/lib/prisma';
import { verifyToken } from '~/server/utils/auth/jwtToken.utils';

// id крайнего запроса (для постраничной навигации)
let cursorId: string | undefined;

export default defineEventHandler(async (event) => {
  // Гет параметры
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

  // Запрос
  const users = await prisma.user.findMany({
    take: 2,
    skip: cursorId ? 1 : 0,
    cursor: cursorId ? { id: cursorId } : undefined,
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    omit: {
      optCode: true,
      password: true,
    },
  });

  // Установка курсора для постраничной навигации
  cursorId = users[1]?.id;
  // console.log('cursorId: ', cursorId);

  // Возвращаем значения
  return {
    items: users,
    cursorId,
  };
});
