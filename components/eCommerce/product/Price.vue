<script setup lang="ts">
defineProps<{
  regularPrice: number;
  salePrice?: number;
}>();
</script>

<template>
  <div class="product_price">
    <span class="product_price__regular">{{ regularPrice }} ₽</span>
    <span v-if="salePrice" class="product_price__sale">{{ salePrice }} ₽</span>
  </div>
</template>

<style lang="css" scoped></style>
