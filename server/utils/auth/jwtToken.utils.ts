import jwt from 'jsonwebtoken';
import { TypeUser } from '~/server/types/auth.types';

const { jwtTokenAccess, jwtTokenRefresh } = useRuntimeConfig();

// Что кодируем
const jwtPayload = (user: TypeUser) => {
  return {
    iss: user.name || 'username',
    user,
    sub: user.id,
    aud: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 + 60 * 60,
    lat: Math.floor(Date.now() / 1000),
  };
};

// Access токен
export const singAccessToken = (user: TypeUser): Promise<string | undefined | Error | null> => {
  const payload = jwtPayload(user);

  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtTokenAccess, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
};

// Refresh токен
export const signRefreshToken = (user: TypeUser): Promise<string | undefined | Error | null> => {
  const payload = jwtPayload(user);

  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtTokenRefresh, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
};

// Проверка токена
export const verifyToken = (accessToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, jwtTokenAccess, (err, decoded) => {
      if (err) {
        reject({ message: 'Недействительный токен' });
      }

      resolve(decoded);
    });
  });
};
