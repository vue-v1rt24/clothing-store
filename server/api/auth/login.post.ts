import prisma from '~/lib/prisma';
import { comparePassword } from '~/server/utils/auth/bcrypt.utils';
import { loginSchema, zShowError } from '~/server/utils/auth/validateUserInput.utils';
import { singAccessToken, signRefreshToken } from '~/server/utils/auth/jwtToken';
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

  // Возвращаем данные
  return {
    message: 'Вход в систему',
    redirect: true,
    user: {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    },
    token: {
      accessToken,
      refreshToken,
    },
  };
});
