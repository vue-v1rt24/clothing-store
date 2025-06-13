import prisma from '~/lib/prisma';
import { comparePassword } from '~/server/utils/auth/bcrypt.utils';
import { loginSchema, zShowError } from '~/server/utils/auth/validateUserInput.utils';
import { singAccessToken, signRefreshToken } from '~/server/utils/auth/jwtToken.utils';
import { sendCookie } from '~/server/utils/auth/sendCookie.utils';
import { type TypeForm, UserEmailType } from '~/server/types/auth.types';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<TypeForm>(event);

  // Проверка входящих данных
  const resValid = loginSchema.safeParse({ email, password });

  if (!resValid.success) {
    throw createError({
      statusCode: 422,
      message: 'Введите правильные данные в поля',
      data: zShowError(resValid.error),
    });
  }

  // Выборка пользователя
  const userExist = await prisma.user.findUnique({
    where: {
      email,
      isValidEmail: UserEmailType.ValidEmail,
    },
  });

  if (!userExist) {
    throw createError({
      statusCode: 422,
      message: 'Неверный логин или пароль',
      data: ['Неверный логин или пароль'],
    });
  }

  // Сравниваем пароли
  const comparePwd = comparePassword(password, userExist.password);

  if (!comparePwd) {
    throw createError({
      statusCode: 422,
      message: 'Неверный логин или пароль',
      data: ['Неверный логин или пароль'],
    });
  }

  // Создаём токены авторизации
  const [accessToken, refreshToken] = await Promise.all([
    singAccessToken(userExist.id),
    signRefreshToken(userExist.id),
  ]);

  // Устанавливаем куки
  if (accessToken && typeof accessToken === 'string') {
    sendCookie(event, 'access_token', accessToken, 60 * 60 * 24 * 7, true);
  }

  if (refreshToken && typeof refreshToken === 'string') {
    sendCookie(event, 'refresh_token', refreshToken, 60 * 60 * 24 * 7, true, true);
  }

  const userData = {
    id: userExist.id,
    name: userExist.name,
    email: userExist.email,
  };

  sendCookie(event, 'user', JSON.stringify(userData));

  // Возвращаем данные
  return {
    message: 'Вы вошли в систему',
    redirect: true,
    /* user: {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    }, */
  };
});
