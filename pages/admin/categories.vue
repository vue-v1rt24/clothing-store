<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type { TypeCategory } from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

// Получение всех категорий
const { data: categories, refresh: getCategories } = await useFetch('/api/admin/category/select');

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
  category = null,
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
    getCategories();
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
    <AdminCategoriesTable
      v-if="categories?.categories"
      :categories="categories.categories"
      @edit-category="editCategory"
    />
  </div>
</template>

<style lang="css" scoped></style>
