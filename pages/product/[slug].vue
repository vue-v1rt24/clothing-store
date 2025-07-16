<script setup lang="ts">
import type { TypeProductFull } from '~/types/eCommerce/product.types';

const route = useRoute('product-slug');

const { data: product } = await useFetch<TypeProductFull>(
  `/api/eCommerce/product/${route.params.slug}`,
);

console.log(product.value?.productsCategory);

// Количество товара
const quantity = ref(1);

// Добавить в корзину
const addToCard = () => {
  console.log(product.value?.product?.id, quantity.value);
};
</script>

<template>
  <div class="container">
    <div class="product">
      <div class="product__img">
        <NuxtImg :src="`/uploads/${product?.product?.image[0]?.url}`" />
      </div>

      <div class="product__content">
        <div class="product__content_title_price">
          <span class="product__content_title">
            {{ product?.product?.name }}
          </span>

          <span class="product__content_price"> {{ product?.product?.price }} ₽ </span>
        </div>

        <!-- Добавить в корзину -->
        <div class="product__content_addToCart">
          <UIInput type="number" v-model="quantity" />
          <UIButton title="Добавить в корзину" @btn-handler="addToCard" />
        </div>

        <!-- Название категории -->
        <div class="product__content_category">
          Категория: {{ product?.product?.category?.name }}
        </div>
      </div>
    </div>

    <!-- Товары с одной категории -->
    <div class="products_category_wrap">
      <h2>Похожие товары</h2>

      <div class="products_category">
        <ECommerceProduct v-for="product in product?.productsCategory" :key="product.id" :product />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/*  */

.product__img {
  img {
    width: 50%;
  }
}

/*  */

.product__content {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

/*  */

.product__content_title_price {
  display: flex;
  justify-content: space-between;
}

/*  */

.product__content_addToCart {
  display: flex;
  align-items: center;
  column-gap: 10px;

  /*  */
  input {
    width: 100px;
  }
}

/* Похожие товары */

.products_category_wrap {
  margin-top: 30px;

  /*  */
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

/*  */
.products_category {
  display: flex;
  flex-wrap: wrap;
}
</style>
