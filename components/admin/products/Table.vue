<script setup lang="ts">
import type { TypeProduct } from '~/types/admin.types';

defineProps<{
  products: TypeProduct[];
}>();

const emit = defineEmits<{
  editProduct: [category: TypeProduct];
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
        <tr v-for="(category, idx) in products" :key="category.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ category.name }}</td>
          <td>
            <button type="button" @click="emit('editProduct', category)">
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
  margin-top: 60px;
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
