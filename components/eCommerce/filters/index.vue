<script setup lang="ts">
import type { AllFilters } from '~/types/eCommerce/filters.types';

//
const route = useRoute();

// Получение всех фильтров
const { data: filters } = await useFetch<AllFilters>('/api/eCommerce/filters');

// Установка Гет-параметров
const setGetParams = async (val: any) => {
  await navigateTo({
    query: {
      ...route.query,
      ...val,
    },
  });
};

// Сброс фильтров
const resetFilters = async () => {
  await navigateTo({
    query: route.query.search ? { search: route.query.search } : {},
  });
};
</script>

<template>
  <aside class="filters">
    <!-- Фильтр по цене -->
    <ECommerceFiltersRangeSlider
      v-if="filters?.priceMinMax.length"
      :min-price="filters.priceMinMax[0]"
      :max-price="filters.priceMinMax[1]"
      @prices-handler="setGetParams"
    />

    <!-- Фильтр по категориям -->
    <ECommerceFiltersCategories
      v-if="filters?.categories.length"
      :categories="filters.categories"
      @categories-handler="setGetParams"
    />

    <!-- Фильтр по цветам -->
    <ECommerceFiltersColors
      v-if="filters?.colors.length"
      :colors="filters.colors"
      @colors-handler="setGetParams"
    />

    <!-- Сброс фильтров -->
    <UIButton title="Сброс" @btn-handler="resetFilters" />
  </aside>
</template>

<style lang="css" scoped>
.filters {
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  padding-left: 30px;
}

/*  */
.filters :deep(.filter__h2) {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
