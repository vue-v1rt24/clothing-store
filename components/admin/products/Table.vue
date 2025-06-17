<script setup lang="ts">
import type { TypeProduct } from '~/types/admin.types';

defineProps<{
  products: TypeProduct[];
}>();

const emit = defineEmits<{
  editProduct: [product: TypeProduct];
}>();
</script>

<template>
  <div class="table_bx">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Категория</th>
          <th scope="col">Цвет</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in products" :key="product.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{ product.color }}</td>
          <td>{{ product.price }} ₽</td>
          <td>
            <button type="button" @click="emit('editProduct', product)">Редактировать товар</button>
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
