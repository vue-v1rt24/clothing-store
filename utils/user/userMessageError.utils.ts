export const userMessageError = (errors: string[]) => {
  for (const item of errors) {
    errorMsg(item);
  }
};
