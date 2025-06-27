<script setup lang="ts">
useSeoMeta({
  title: 'Главная',
  description: 'Товары',
});
</script>

<template>
  <div class="home">
    <ECommerceFilters />

    <main class="main">
      <ECommerceProductGrid />
    </main>
  </div>
</template>

<style lang="css" scoped>
.home {
  display: grid;
  grid-template-columns: 300px 1fr;
  column-gap: 30px;
}
</style>
