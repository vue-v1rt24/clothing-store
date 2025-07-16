<script setup lang="ts">
const emit = defineEmits<{
  searchHandler: [val: string];
}>();

const search = ref('');

const searchHandler = () => {
  emit('searchHandler', search.value);
};
</script>

<template>
  <div class="search">
    <UIInput
      type="search"
      placeholder="Поиск товара"
      v-model="search"
      @keydown.enter="searchHandler"
    />

    <UIButton title="Поиск" @btn-handler="searchHandler" />
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
