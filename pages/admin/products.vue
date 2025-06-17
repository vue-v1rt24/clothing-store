<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type { TypeProduct, TypeCategory } from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

// Для поиска товара
const search = ref('');

// Постраничная навигация
const page = ref(1);
const limit = ref(10);

// Получение всех товаров
const { data: products, refresh: refreshProducts } = await useFetch('/api/admin/product/select', {
  query: {
    search,
    page,
    limit,
  },
});

// Получение всех категорий
const { data: cats, refresh: refreshCategories } = await useFetch('/api/admin/category/select');

// Модальное окно
const modals = useModals();

/**
 *
 * @param title Заголовок модального окна
 * @param btnTitle Название кнопки
 * @param product Объект продуктов
 * @param type Тип
 */
const create = async (
  title = 'Создать товар',
  btnTitle = 'Создать',
  product: TypeProduct | null = null,
  categories: TypeCategory[] | undefined = cats.value?.categories,
  type = false,
) => {
  const res = await modals.open(import('~/components/admin/products/CreateProductModal.vue'), {
    props: {
      title,
      btnTitle,
      product,
      categories,
      type,
    },
  });

  if (res) {
    refreshProducts();
  }
};

// Редактирование товара
const editProduct = (product: TypeProduct) => {
  create('Редактировать товар', 'Редактировать', product, cats.value?.categories, true);
};

// Поиск товара
const searchHandler = (val: string) => {
  search.value = val;
};
</script>

<template>
  <div>
    <div class="product_controls">
      <!-- Кнопка создания товара -->
      <UIButton width="150px" title="Создать" @btn-handler="create" />

      <!-- Кнопка поиска -->
      <UISearch @search-handler="searchHandler" />
    </div>

    <!--  -->
    <div class="content">
      <AdminProductsTable
        v-if="products?.products.length"
        :products="products.products"
        @edit-product="editProduct"
      />

      <div v-else>Товаров пока нет</div>
    </div>
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
}
</style>
