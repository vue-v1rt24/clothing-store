<script setup lang="ts">
const route = useRoute('product-slug');
</script>

<template>
  <div>Страница товара {{ route.params.slug }}</div>
</template>

<style lang="css" scoped></style>
