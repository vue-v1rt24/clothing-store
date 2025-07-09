<script setup lang="ts">
import type { TypeUploadContentData } from '@/types/admin.types';
import { useEComFilterStore } from '~/stores/eCommerce/filters';
import type { TypeProduct } from '~/types/eCommerce/product.types';

//
const store = useEComFilterStore();
const { minPrice, maxPrice, categoryChecked } = storeToRefs(store);

//
const route = useRoute();

// Для поиска товара
const search = ref(route.query.search);

// Получение товаров и постраничной навигации
const { data: products, error: productError } = await useFetch('/api/eCommerce/product/select', {
  query: {
    search,
  },
});

// Поиск товаров
const searchHandler = async (val: string) => {
  await navigateTo({
    query: {
      search: val,
    },
  });

  search.value = val;
};

// === Кнопка "Показать ещё"
// Курсор постраничной навигации
const cursorId = ref(products.value?.cursorId);

const uploadContentHandler = (uploadData: TypeUploadContentData<Required<TypeProduct>>) => {
  // Добавляем товары
  products.value?.items.push(...uploadData.items);

  // Установка значения курсора постраничной навигации
  cursorId.value = uploadData.cursorId;
};

// Отслеживание получения пользователей
watch(products, () => {
  // Установка значения курсора постраничной навигации
  cursorId.value = products.value?.cursorId;
});
// === /Кнопка "Показать ещё"
</script>

<template>
  <div class="product_controls">
    <!-- Кнопка поиска -->
    <UISearch @search-handler="searchHandler" />
  </div>

  <section class="product_grid">
    <template v-if="products?.items.length">
      <ECommerceProduct v-for="product in products.items" :key="product.id" :product />
    </template>

    <div v-else>Товаров пока нет</div>
  </section>

  <!-- Кнопка показать ещё -->
  <!-- @vue-generic {Required<import('@/types/eCommerce/product.types').TypeProduct>} -->
  <UIUploadingContent
    v-if="cursorId"
    url="/api/eCommerce/product/select"
    :cursor-id="cursorId"
    :search
    @upload-content-handler="uploadContentHandler"
  />
</template>

<style lang="css" scoped></style>
