export const sendEmailVerification = async (receiverEmail: string, optCode: string) => {
  const { sendMail } = useNodeMailer();

  await sendMail({
    subject: 'Подтверждение почты',
    text: `Здравствуйте! Используйте этот код для подтверждения вашей эл. почты: ${optCode}`,
    to: receiverEmail,
  });
};
