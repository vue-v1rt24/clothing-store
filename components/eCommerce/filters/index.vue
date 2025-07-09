<script setup lang="ts">
import type { AllFilters } from '~/types/eCommerce/filters.types';

// Получение фильтров
const { data: filters } = await useFetch<AllFilters>('/api/eCommerce/filters');

console.log(filters.value?.colors);
</script>

<template>
  <aside class="filters">
    <ECommerceFiltersRangeSlider />
    <ECommerceFiltersCategories v-if="filters?.categories" :categories="filters.categories" />
    <ECommerceFiltersColors v-if="filters?.colors" :colors="filters.colors" />
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
