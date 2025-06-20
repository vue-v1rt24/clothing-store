<script setup lang="ts">
import { useModal } from '@outloud/vue-modals';

//
defineProps<{
  title?: string;
  text?: string;
}>();

//
const { close } = useModal();
</script>

<template>
  <UIModal>
    <div class="confirm">
      <div v-if="title" class="confirm__title">{{ title }}</div>
      <div v-if="text" class="confirm__text">{{ text }}</div>

      <!--  -->
      <div class="confirm__btns">
        <button @click="close(false)">Отмена</button>
        <button @click="close(true)">Подтвердить</button>
      </div>
    </div>
  </UIModal>
</template>

<style lang="css" scoped>
.confirm {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.confirm__title {
  font-size: 24px;
}

.confirm__text {
  color: rgb(255, 0, 0);
}

.confirm__btns {
  display: flex;
  column-gap: 10px;
}
</style>
