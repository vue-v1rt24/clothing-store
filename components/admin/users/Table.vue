<script setup lang="ts">
import type { TypeUser } from '~/types/admin.types';

defineProps<{
  users: TypeUser[];
}>();
</script>

<template>
  <div class="table_bx">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Почта</th>
          <th scope="col">Подтверждение почты</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="user.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span v-if="user.isValidEmail === 1">Подтверждён</span>
            <span v-else>Не подтверждён</span>
          </td>
          <td>Действия</td>
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
