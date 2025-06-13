import jwt from 'jsonwebtoken';

const { jwtTokenAccess, jwtTokenRefresh } = useRuntimeConfig();

//
const jwtPayload = (userId: string) => {
  return {
    iss: 'UserName',
    sub: userId,
    aud: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 + 60 * 60,
    lat: Math.floor(Date.now() / 1000),
  };
};

//
export const singAccessToken = (userId: string): Promise<string | undefined | Error | null> => {
  const payload = jwtPayload(userId);

  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtTokenAccess, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
};

//
export const signRefreshToken = (userId: string): Promise<string | undefined | Error | null> => {
  const payload = jwtPayload(userId);

  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtTokenRefresh, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
};
