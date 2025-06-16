<script setup lang="ts">
import { useModal } from '@outloud/vue-modals';
const { close } = useModal();

/*
Документация:
https://vue-modals.byoutloud.com/docs/nuxt
 */

const { width = '600px' } = defineProps<{
  width?: string;
}>();
</script>

<template>
  <div class="modal">
    <button type="button" class="modal__close" title="Закрыть" @click="close()">⛌</button>
    <slot />
  </div>
</template>

<style lang="css" scoped>
.modal {
  position: relative;
  width: 100%;
  max-width: v-bind(width);
  background-color: aliceblue;
  border-radius: 15px;
  padding: 20px;
  margin: auto;

  /*  */
  @media (max-width: 650px) {
    margin: auto 30px;
  }
}

.modal__close {
  position: absolute;
  top: -27px;
  right: -30px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  padding-bottom: 2px;

  /*  */
  @media (max-width: 700px) {
    top: -40px;
    right: 0;
  }
}
</style>
