import prisma from '~/lib/prisma';
import { hashPassword } from '~/server/utils/auth/bcrypt.utils';
import { loginSchema, zShowError } from '~/server/utils/auth/validateUserInput.utils';
import { TypeForm } from '~/server/types/auth.types';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<TypeForm>(event);

  // Проверка входящих данных
  const resValid = loginSchema.safeParse({ email, password });

  if (!resValid.success) {
    throw createError({
      statusCode: 400,
      message: 'Введите правильные данные в поля',
      data: zShowError(resValid.error),
    });
  }

  // Проверка существования пользователя
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    throw createError({
      statusCode: 400,
      message: 'Пользователь с такой почтой уже существует',
      data: ['Пользователь с такой почтой уже существует'],
    });
  }

  // Кэшируем пароль
  const hashPwd = await hashPassword(password);

  // Создаём пользователя
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPwd,
    },
    omit: {
      password: true,
    },
  });

  //
  return user;
});
