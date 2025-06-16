<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type { TypeProduct } from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

// Получение всех категорий
const { data: products, refresh: getProducts } = await useFetch('/api/admin/product/select');

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
  title = 'Создать товар',
  btnTitle = 'Создать',
  category = null,
  type = false,
) => {
  const res = await modals.open(import('~/components/admin/products/CreateProductModal.vue'), {
    props: {
      title,
      btnTitle,
      product,
      type,
    },
  });

  if (res) {
    getProducts();
  }
};

// Редактирование товара
const editProduct = (product: TypeProduct) => {
  create('Редактировать товар', 'Редактировать', product, true);
};
</script>

<template>
  <div>
    <!-- Кнопка создания товара -->
    <UIButton width="150px" title="Создать" @btn-handler="create" />

    <!--  -->
    <AdminProductsTable
      v-if="products?.products"
      :categories="products.products"
      @edit-category="editProduct"
    />
  </div>
</template>

<style lang="css" scoped></style>
