<script setup lang="ts" generic="T">
import type { LocationQuery } from 'vue-router';
import type { TypeUploadContentData } from '~/types/admin.types';

//
const {
  url,
  headers,
  title = 'Загрузить ещё',
  params = undefined,
} = defineProps<{
  url: string; // ссылка запроса для получения данных
  headers?: HeadersInit | undefined;
  cursorId?: string; // курсор постраничной навигации
  title?: string; // название кнопки
  params?: LocationQuery; // параметры роутера
}>();

const emit = defineEmits<{
  uploadContentHandler: [uploadContent: TypeUploadContentData<T>];
}>();

// Блокировка / Разблокировка кнопки
const loading = ref(false);

// Клик по кнопке
const moreHandler = async () => {
  loading.value = true;

  try {
    // Получение всех товаров
    const res = await $fetch<TypeUploadContentData<T>>(url, {
      headers,
      query: {
        more: 'load',
        params,
      },
    });

    // console.log(res);

    // Отправляем данные родителю
    emit('uploadContentHandler', res);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UIButton :title :loading @btn-handler="moreHandler" />
</template>

<style lang="css" scoped></style>
