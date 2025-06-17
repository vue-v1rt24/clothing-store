export const messageValidateError = (errors: string[]) => {
  for (const item of errors) {
    errorMsg(item);
  }
};
