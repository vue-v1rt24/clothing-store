<script setup lang="ts">
import type { CategoryFilter } from '~/types/eCommerce/filters.types';

//
const route = useRoute();

//
defineProps<{
  categories: CategoryFilter[];
}>();

const emit = defineEmits<{
  categoriesHandler: [categoryIds: {}];
}>();

//
const cats: string[] = route.query.categories ? JSON.parse(route.query.categories as string) : [];
const categoryChecked = ref<string[]>(cats);

// Отправка данных в родительский компонент
watch(categoryChecked, (val) => {
  emit('categoriesHandler', { categories: JSON.stringify(val) });
});

// Сброс фильтра
watch(
  () => route.query.categories,
  (val) => {
    if (!val) {
      categoryChecked.value = [];
    }
  },
);
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
