import { H3Event } from 'h3';

/**
 *
 * @param event event
 * @param nameToken Название куки
 * @param tokenJWT JWT код
 * @param maxAge время жизни куки
 * @param sameSite  boolean | undefined
 * @param httpOnly  boolean | undefined
 */

export const sendCookie = (
  event: H3Event,
  nameToken: string,
  tokenJWT: string,
  maxAge: number | undefined = undefined,
  sameSite: boolean | undefined = false,
  httpOnly: boolean | undefined = false,
) => {
  setCookie(event, nameToken, tokenJWT, {
    maxAge,
    sameSite,
    httpOnly,
  });
};
