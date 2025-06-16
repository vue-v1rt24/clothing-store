export const messageError = (errors: string[]) => {
  for (const item of errors) {
    errorMsg(item);
  }
};
