<script setup lang="ts">
const emit = defineEmits<{
  searchHandler: [val: string];
}>();

const search = ref('');
</script>

<template>
  <div class="search">
    <UIInput
      type="search"
      placeholder="Поиск товара"
      v-model="search"
      @keydown.enter="emit('searchHandler', search)"
    />

    <UIButton title="Поиск" @btn-handler="emit('searchHandler', search)" />
  </div>
</template>

<style lang="css" scoped>
.search {
  display: grid;
  grid-template-columns: 1fr 300px;
  column-gap: 10px;

  /*  */
  input {
    width: auto;
  }
}
</style>
