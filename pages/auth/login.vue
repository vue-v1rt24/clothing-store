<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { messageValidateError } from '~/utils/messageValidateError.utils';

//
definePageMeta({
  layout: 'auth',
});

//
const loading = ref(false);

// Для полей формы
const { formFields } = storeToRefs(useAuthStore());

// Валидация формы
const rules = {
  email: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    email: helpers.withMessage('Неправильная почта', email),
  },
  password: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    minLength: helpers.withMessage('Длина пароля не менее 6 символов', minLength(6)),
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

  // Запрос
  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: formFields.value,
    });

    // console.log(data);

    // Выводим уведомление
    successMsg(data.message);

    // Очищение хранилища
    formFields.value.email = formFields.value.password = '';

    // Сброс валидации
    v$.value.$reset();

    // Перенаправление на главную страницу
    await navigateTo('/admin/dashboard');
  } catch (error: any) {
    messageValidateError(error.data.data);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth_form">
    <h1>Авторизация</h1>

    <form @submit.prevent="loginHandler">
      <UIFormError :errors="v$.email.$errors">
        <UIInput v-model="formFields.email" placeholder="w@w.ww" />
      </UIFormError>

      <UIFormError :errors="v$.password.$errors">
        <UIInput v-model="formFields.password" placeholder="Пароль" />
      </UIFormError>

      <UIButton type="submit" title="Войти" :loading />

      <div class="auth_form__question">
        Нет учётной записи?
        <NuxtLink to="/auth/register">Зарегистрироваться</NuxtLink>
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
