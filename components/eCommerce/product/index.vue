<script setup lang="ts">
import type { TypeProduct } from '~/types/eCommerce/product.types';
import defaultImg from '@/public/defaultImg.jpg';

//
const { product } = defineProps<{
  product: TypeProduct;
}>();

// Вывод изображения
const image = computed(() => {
  return product.image.length ? `/uploads/${product.image[0].url}` : defaultImg;
});
</script>

<template>
  <div class="product">
    <NuxtLink :to="`/product/${product.slug}`">
      <NuxtImg
        :src="image"
        width="300px"
        :alt="product.name"
        loading="lazy"
        densities="x1"
        format="webp"
      />
      <h2>{{ product.name }}</h2>
      <ECommerceProductPrice :regular-price="product.price" />
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped></style>
