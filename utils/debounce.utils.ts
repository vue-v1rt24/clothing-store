export const debounce = (callback: Function, delay: number) => {
  let scrollTimeout: NodeJS.Timeout;

  return (param?: any) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      callback(param);
    }, delay);
  };
};
