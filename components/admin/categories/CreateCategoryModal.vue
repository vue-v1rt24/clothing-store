<script setup lang="ts">
import { useModal } from '@outloud/vue-modals';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { messageValidateError } from '~/utils/messageValidateError.utils';
import type { TypeCategory, TypeResponseCategory } from '~/types/admin.types';

//
const { title, btnTitle, category, type } = defineProps<{
  title: string;
  btnTitle: string;
  category: TypeCategory | null;
  type: boolean;
}>();

//
const { close } = useModal();

//
const loading = ref(false);

// Для полей формы
const formFields = reactive({
  name: category?.name ?? '',
});

// Валидация формы
const rules = {
  name: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    minLength: helpers.withMessage('Длина названия категории не менее 3 символов', minLength(3)),
  },
};

const v$ = useVuelidate(rules, formFields);

// Отправка формы
const createCategoryHandler = async () => {
  // Запускаем валидацию
  v$.value.$touch();

  // Если есть ошибки
  if (v$.value.$error) return;

  // Если значение поля не поменялось
  if (formFields.name === category?.name) return;

  //
  loading.value = true;

  // Запрос
  try {
    let res: TypeResponseCategory;

    if (type) {
      res = await $fetch('/api/admin/category/update', {
        method: 'PATCH',
        headers: useHeaders(),
        body: {
          id: category?.id,
          ...formFields,
        },
      });
    } else {
      res = await $fetch('/api/admin/category/create', {
        method: 'POST',
        headers: useHeaders(),
        body: formFields,
      });
    }

    // Очищение полей формы
    formFields.name = '';

    // Сброс валидации
    v$.value.$reset();

    // Закрытие модального окна
    close(true);

    //
    successMsg(res.message);
  } catch (error: any) {
    messageValidateError(error.data.data);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UIModal>
    <div class="title">{{ title }}</div>

    <!--  -->
    <form class="create_category" @submit.prevent="createCategoryHandler">
      <UIFormError :errors="v$.name.$errors">
        <UIInput v-model="formFields.name" placeholder="Название категории" />
      </UIFormError>

      <UIButton type="submit" :title="btnTitle" :loading />
    </form>
  </UIModal>
</template>

<style lang="css" scoped>
.title {
  font-size: 24px;
  margin-bottom: 30px;
}

.create_category {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
</style>
