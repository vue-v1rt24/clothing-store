<script setup lang="ts">
const {
  type = 'button',
  width = '100%',
  height = '50px',
} = defineProps<{
  type?: 'submit' | 'button';
  loading?: boolean;
  title?: string;
  width?: string;
  height?: string;
}>();

const emit = defineEmits<{
  btnHandler: [];
}>();
</script>

<template>
  <button :type :disabled="loading" @click="emit('btnHandler')" class="btn">
    {{ title }}
  </button>
</template>

<style lang="css" scoped>
.btn {
  width: v-bind(width);
  height: v-bind(height);
  color: white;
  background-color: rgb(37, 127, 217);
  border: none;
  border-radius: 20px;
}
</style>
