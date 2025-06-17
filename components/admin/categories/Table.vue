<script setup lang="ts">
import type { TypeCategory } from '~/types/admin.types';

defineProps<{
  categories: TypeCategory[];
}>();

const emit = defineEmits<{
  editCategory: [category: TypeCategory];
}>();
</script>

<template>
  <div class="table_bx">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название категории</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, idx) in categories" :key="category.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ category.name }}</td>
          <td>
            <button type="button" @click="emit('editCategory', category)">
              Редактировать категорию
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
.table {
  width: 100%;
  border: 1px solid;
}

.table th {
  font-family: var(--MontserratSemiBold);
  color: #303030;
  border: 1px solid;
  padding: 0 10px;
}

.table td {
  font-family: var(--MontserratRegular);
  color: #8c8c8c;
  text-align: center;
  padding-top: 18px;
  border: 1px solid;
}
</style>
