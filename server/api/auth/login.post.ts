import prisma from '~/lib/prisma';
import { comparePassword } from '~/server/utils/auth/bcrypt.utils';
import { loginSchemaLogin } from '~/server/utils/auth/validate.utils';
import { singAccessToken, signRefreshToken } from '~/server/utils/auth/jwtToken.utils';
import { type TypeForm, UserEmailType } from '~/server/types/auth.types';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<TypeForm>(event);

  // Проверка входящих данных
  const resValid = loginSchemaLogin.safeParse({ email, password });

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
    singAccessToken({ id: userExist.id, name: userExist.name, email: userExist.email }),
    signRefreshToken({ id: userExist.id, name: userExist.name, email: userExist.email }),
  ]);

  // Устанавливаем куки
  if (accessToken && typeof accessToken === 'string') {
    setCookie(event, 'access_token', accessToken, {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: true,
    });
  }

  if (refreshToken && typeof refreshToken === 'string') {
    setCookie(event, 'refresh_token', refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: true,
      httpOnly: true,
    });
  }

  const userData = {
    id: userExist.id,
    name: userExist.name,
    email: userExist.email,
  };

  // Возвращаем данные
  return {
    message: 'Вы вошли в систему',
    redirect: true,
  };
});
