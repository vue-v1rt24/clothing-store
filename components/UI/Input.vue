<script setup lang="ts">
const modelValue = defineModel();

const { type = 'text' } = defineProps<{
  type?: 'text' | 'email' | 'number' | 'search';
  placeholder?: string;
}>();
</script>

<template>
  <input :type v-model="modelValue" :placeholder class="form_input" />
</template>

<style lang="css" scoped>
.form_input {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0 20px;
}
</style>
