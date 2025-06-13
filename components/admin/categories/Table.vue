<script setup lang="ts">
import { id } from 'zod/v4/locales';

defineProps<{
  categories: any[];
}>();

//
const create = () => {
  console.log('Создать категорию');
};
</script>

<template>
  <div class="table_bx">
    <UIButton width="150px" title="Создать" @btn-handler="create" />

    <!--  -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, idx) in categories" :key="category.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ category.name }}</td>
          <td>Otto</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
.table th {
  font-family: var(--MontserratSemiBold);
  color: #303030;
  padding: 0 10px;
}

.table td {
  font-family: var(--MontserratRegular);
  color: #8c8c8c;
  text-align: center;
  padding-top: 18px;
}
</style>
