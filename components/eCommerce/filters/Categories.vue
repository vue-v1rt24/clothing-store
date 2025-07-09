<script setup lang="ts">
import { useEComFilterStore } from '~/stores/eCommerce/filters';
import type { CategoryFilter } from '~/types/eCommerce/filters.types';

//
defineProps<{
  categories: CategoryFilter[];
}>();

//
const store = useEComFilterStore();
const { categoryChecked } = storeToRefs(store);
</script>

<template>
  <div class="categories_wrapper">
    <h2 class="filter__h2">Категории</h2>

    <div class="categories">
      <label v-for="category in categories" :key="category.id" class="categories__item">
        <input type="checkbox" :value="category.id" v-model="categoryChecked" />
        <span>{{ category.name }}</span>
      </label>
    </div>
  </div>
</template>

<style lang="css" scoped>
.categories_wrapper {
}

/*  */

.categories {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.categories__item {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
