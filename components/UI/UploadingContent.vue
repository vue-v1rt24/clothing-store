<script setup lang="ts" generic="T">
import type { LocationQueryValue } from 'vue-router';
import type { TypeUploadContentData } from '~/types/admin.types';

//
const {
  url,
  headers,
  title = 'Загрузить ещё',
  search,
} = defineProps<{
  url: string; // ссылка запроса для получения данных
  headers?: HeadersInit | undefined;
  cursorId: string; // курсор постраничной навигации
  title?: string; // название кнопки
  search?: LocationQueryValue | LocationQueryValue[]; // если есть поиск по элементам (должен быть гет-параметром(query) vue-router)
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
        search,
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
