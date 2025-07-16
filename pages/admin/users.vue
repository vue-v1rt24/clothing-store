<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type { TypeUploadContentData, TypeUser } from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

//
const route = useRoute();

// Для поиска товара
const search = ref(route.query);

// Получение всех пользователей
const { data: users, error: errorSelect } = await useFetch('/api/admin/user/select', {
  headers: useHeaders(),
  query: {
    params: search,
  },
});

// Если нет авторизации
if (errorSelect.value?.statusCode === 401) {
  await navigateTo({
    path: '/auth/login',
    query: {
      message: 'login',
    },
  });
}

// Модальное окно
const modals = useModals();

// Поиск пользователей
const searchHandler = async (val: string) => {
  await navigateTo({
    query: {
      search: val,
    },
  });

  search.value = { search: val };
};

// === Кнопка "Показать ещё"
// Курсор постраничной навигации
const cursorId = ref(users.value?.cursorId);

const uploadContentHandler = (uploadData: TypeUploadContentData<Required<TypeUser>>) => {
  // Добавляем товары
  users.value?.items.push(...uploadData.items);

  // Установка значения курсора постраничной навигации
  cursorId.value = uploadData.cursorId;
};

// Отслеживание получения пользователей
watch(users, () => {
  // Установка значения курсора постраничной навигации
  cursorId.value = users.value?.cursorId;
});
// === /Кнопка "Показать ещё"
</script>

<template>
  <div>
    <div class="product_controls">
      <!-- Кнопка поиска -->
      <UISearch @search-handler="searchHandler" />
    </div>

    <!--  -->
    <div class="content">
      <AdminUsersTable v-if="users?.items.length" :users="users.items" />

      <div v-else>Пользователей пока нет</div>
    </div>

    <!-- Кнопка показать ещё -->
    <!-- @vue-generic {Required<import('@/types/admin.types').TypeUser>} -->
    <UIUploadingContent
      v-if="cursorId"
      url="/api/admin/user/select"
      :headers="useHeaders()"
      :cursor-id="cursorId"
      :params="search"
      @upload-content-handler="uploadContentHandler"
    />
  </div>
</template>

<style lang="css" scoped>
.product_controls {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

/*  */

.content {
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
