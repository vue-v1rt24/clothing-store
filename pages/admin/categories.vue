<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type { TypeCategory } from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

// Получение всех категорий
const {
  data: categories,
  refresh: refreshCategories,
  error: errorSelect,
} = await useFetch('/api/admin/category/select', {
  headers: useHeaders(),
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

/**
 *
 * @param title Заголовок модального окна
 * @param btnTitle Название кнопки
 * @param category Объект категории
 * @param type Тип
 */
const create = async (
  title = 'Создать категорию',
  btnTitle = 'Создать',
  category: TypeCategory | null = null,
  type = false,
) => {
  const res = await modals.open(import('~/components/admin/categories/CreateCategoryModal.vue'), {
    props: {
      title,
      btnTitle,
      category,
      type,
    },
  });

  if (res) {
    refreshCategories();
  }
};

// Редактирование категории
const editCategory = (category: TypeCategory) => {
  create('Редактировать категорию', 'Редактировать', category, true);
};
</script>

<template>
  <div>
    <!-- Кнопка создания категории -->
    <UIButton width="150px" title="Создать" @btn-handler="create" />

    <!--  -->
    <div class="content">
      <AdminCategoriesTable
        v-if="categories?.categories.length"
        :categories="categories.categories"
        @edit-category="editCategory"
      />

      <div v-else>Категорий пока нет</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.content {
  margin-top: 60px;
}
</style>
