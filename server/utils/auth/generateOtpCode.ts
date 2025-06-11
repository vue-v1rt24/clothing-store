export const generateOtpCode = (length = 6) => {
  const digits = '0123456789';
  let opt = '';

  for (let index = 0; index < length; index++) {
    opt += digits[Math.floor(Math.random() * digits.length)];
  }

  return opt;
};
