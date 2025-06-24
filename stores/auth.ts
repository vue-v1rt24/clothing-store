import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { TypeUser } from '~/types/admin.types';

export const useAuthStore = defineStore('auth', () => {
  // Получаем пользователя из токена
  const user = computed<TypeUser | null>(() => {
    const accessToken = useCookie('access_token');
    let userData: TypeUser | null = null;

    if (accessToken.value) {
      // Получаем данные пользователя из JWT токена
      const { user } = jwtDecode(accessToken.value) as JwtPayload & { user: TypeUser };
      userData = user;
    }

    return userData;
  });

  // Поля для форм регистрации и авторизации
  const formFields = ref({
    name: 'Псевдоним',
    email: 'w@w.ww',
    password: '111111',
  });

  //
  return { user, formFields };
});
