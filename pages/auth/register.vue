<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

//
definePageMeta({
  layout: 'auth',
});

//
const loading = ref(false);

// Для полей формы
const { formFields } = storeToRefs(useAuthStore());

// Валидация
const rules = {
  email: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    // email: helpers.withMessage('Неправильная почта', email),
  },
  password: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    // minLength: helpers.withMessage('Длина пароля не менее 6 символов', minLength(6)),
  },
};

const v$ = useVuelidate(rules, formFields.value);

// Отправка формы
const loginHandler = async () => {
  // Запускаем валидацию
  v$.value.$touch();

  // Если есть ошибки
  if (v$.value.$error) return;

  //
  loading.value = true;

  // Отправка формы
  try {
    const data = await $fetch('/api/auth/register', {
      method: 'POST',
      body: formFields.value,
    });

    successMsg('Для подтверждения мы вам отправили код на вашу эл. почту', 4000);

    // Очищение полей
    // formFields.value.email = formFields.value.password = '';

    // Сброс валидации
    // v$.value.$reset();

    // Перенаправление на страницу подтверждения почты
    await navigateTo('/auth/emailVerification');
  } catch (error: any) {
    for (const item of error.data.data) {
      errorMsg(item);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth_form">
    <h1>Регистрация</h1>

    <form @submit.prevent="loginHandler">
      <UIFormError :errors="v$.email.$errors">
        <UIInput v-model="formFields.email" placeholder="w@w.ww" />
      </UIFormError>

      <UIFormError :errors="v$.password.$errors">
        <UIInput v-model="formFields.password" placeholder="Пароль" />
      </UIFormError>

      <UIButton type="submit" title="Зарегистрироваться" :loading />

      <div class="auth_form__question">
        Есть учётная запись?
        <NuxtLink to="/auth/login">Авторизоваться</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style lang="css" scoped>
.auth_form {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /*  */
  h1 {
    font-size: 25px;
    margin-bottom: 30px;
  }

  /*  */
  form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
