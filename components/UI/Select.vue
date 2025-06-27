<script setup lang="ts" generic="T extends TypeSelect">
import type { TypeSelect } from '~/types/generate.types';

defineProps<{
  optionDefault: string;
  options: T[];
}>();

const modelValue = defineModel();
</script>

<template>
  <select v-model="modelValue" class="select">
    <option value="" disabled>{{ optionDefault }}</option>

    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="css" scoped>
.select {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0 20px;
}
</style>
