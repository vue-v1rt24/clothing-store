<script setup lang="ts">
import { type ErrorObject } from '@vuelidate/core';

defineProps<{
  errors: ErrorObject[];
}>();
</script>

<template>
  <div>
    <slot />

    <div class="input-errors" v-for="error of errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
