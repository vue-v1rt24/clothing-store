export const setLocationStorage = (key: string, data: any) => {
  if (!key && !data) return;

  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocationStorage = (key: string) => {
  if (!key) return;

  return localStorage.getItem(key);
};

export const removeLocationStorage = (key: string) => {
  if (!key) return;

  localStorage.removeItem(key);
};
