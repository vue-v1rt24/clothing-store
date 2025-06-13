export const useAuthStore = defineStore('auth', () => {
  const formFields = ref({
    name: 'Псевдоним',
    email: 'w@w.ww',
    password: '111111',
  });

  //
  return { formFields };
});
