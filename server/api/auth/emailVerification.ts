import prisma from '~/lib/prisma';
import { loginSchemaRegister } from '~/server/utils/auth/validate.utils';
import { type TypeOptCode, UserEmailType } from '~/server/types/auth.types';

export default defineEventHandler(async (event) => {
  const { email, optCode } = await readBody<TypeOptCode>(event);

  // Проверка входящих данных
  const resValid = loginSchemaRegister.safeParse({ email, password: optCode });

  if (!resValid.success) {
    throw createError({
      statusCode: 400,
      message: 'Введите правильные данные в поля',
      data: zShowError(resValid.error),
    });
  }

  // Выбираем пользователя
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExist) {
    throw createError({
      statusCode: 400,
      message: 'Пользователь не найден',
      data: ['Пользователь не найден'],
    });
  }

  // Получаем код
  const existOptCode = userExist.optCode;

  // Проверяем код из БД и пришедший со страницы сайта
  if (parseInt(existOptCode) === parseInt(optCode)) {
    // Обновляем запись пользователя
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isValidEmail: UserEmailType.ValidEmail },
      omit: {
        isValidEmail: true,
        optCode: true,
        password: true,
      },
    });

    return {
      message: 'Адрес эл. почты подтверждён',
      redirect: true,
      updatedUser,
    };
  } else {
    throw createError({
      statusCode: 400,
      message: 'Проверьте правильность введённого кода',
      data: ['Проверьте правильность введённого кода'],
    });
  }
});
