<script setup lang="ts">
import { useModal } from '@outloud/vue-modals';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, minValue, helpers } from '@vuelidate/validators';
import { messageValidateError } from '~/utils/messageValidateError.utils';
import type { TypeProduct, TypeColor, TypeCategory } from '~/types/admin.types';

//
const { title, btnTitle, product, type } = defineProps<{
  title: string;
  btnTitle: string;
  product: TypeProduct | null;
  categories: TypeCategory[] | undefined;
  colors: TypeColor[] | undefined;
  type: boolean;
}>();

//
const { close } = useModal();

//
const loading = ref(false);

// Для полей формы
const formFields = reactive({
  name: product?.name ?? '',
  colorId: product?.colorId ?? '',
  price: product?.price ?? 0,
  categoryId: product?.categoryId ?? '',
});

// Валидация формы
const rules = {
  name: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    minLength: helpers.withMessage('Длина названия товара не менее 3 символов', minLength(3)),
  },
  colorId: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
  },
  price: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
    minValue: helpers.withMessage('Стоимость должна быть больше 0', minValue(1)),
  },
  categoryId: {
    required: helpers.withMessage('Поле обязательное для заполнения', required),
  },
};

const v$ = useVuelidate(rules, formFields);

// Отправка формы
const createProductHandler = async () => {
  // Запускаем валидацию
  v$.value.$touch();

  // Если есть ошибки
  if (v$.value.$error) return;

  // Если значение полей не поменялись
  if (
    product?.name === formFields.name &&
    product.colorId === formFields.colorId &&
    product.price === formFields.price &&
    product.categoryId === formFields.categoryId
  ) {
    return;
  }

  //
  loading.value = true;

  // Запрос
  try {
    let res: any;

    if (type) {
      res = await $fetch('/api/admin/product/update', {
        method: 'PATCH',
        headers: useHeaders(),
        body: {
          id: product?.id,
          ...formFields,
        },
      });
    } else {
      res = await $fetch('/api/admin/product/create', {
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

    // Сообщение
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
    <form class="create_category" @submit.prevent="createProductHandler">
      <UIFormError :errors="v$.name.$errors">
        <UIInput v-model="formFields.name" placeholder="Название товара" />
      </UIFormError>

      <UIFormError :errors="v$.colorId.$errors">
        <UISelect
          v-if="colors?.length"
          v-model="formFields.colorId"
          option-default="Цвет"
          :options="colors"
        />
      </UIFormError>

      <UIFormError :errors="v$.price.$errors">
        <UIInput v-model.number="formFields.price" type="number" placeholder="Стоимость" min="1" />
      </UIFormError>

      <UIFormError :errors="v$.categoryId.$errors">
        <UISelect
          v-if="categories?.length"
          v-model="formFields.categoryId"
          option-default="Категории"
          :options="categories"
        />
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
