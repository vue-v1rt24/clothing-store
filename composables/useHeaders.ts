export const useHeaders = () => {
  const accessToken = useCookie('access_token');

  return {
    Authorization: `Bearer ${accessToken.value}`,
  };
};
