<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
</script>

<template>
  <div>
    <h1>Категории</h1>

    <AdminCategoriesTable :categories="[]" />
  </div>
</template>

<style lang="css" scoped></style>
