export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  if (!url.pathname.includes('/api/admin')) return;

  // Получаем заголовок авторизации
  const authorization = getHeader(event, 'Authorization');

  // Проверка авторизации
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'Нет токена, доступ запрещён',
    });
  }

  // Получаем токен
  const accessToken = authorization.split(' ')[1];

  // Проверка токена
  try {
    await verifyToken(accessToken);
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      message: error.message,
    });
  }
});
