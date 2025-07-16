<script setup lang="ts">
import type { ColorFilter } from '~/types/eCommerce/filters.types';

//
const route = useRoute();

//
defineProps<{
  colors: ColorFilter[];
}>();

const emit = defineEmits<{
  colorsHandler: [colors: {}];
}>();

//
const clr: string[] = route.query.colors ? JSON.parse(route.query.colors as string) : [];
const colorsState = ref<string[]>(clr);

// Отправка данных в родительский компонент
watch(colorsState, (val) => {
  emit('colorsHandler', { colors: JSON.stringify(val) });
});

// Сброс фильтра
watch(
  () => route.query.colors,
  (val) => {
    if (!val) {
      colorsState.value = [];
    }
  },
);
</script>

<template>
  <div>
    <h2 class="filter__h2">Цвет</h2>

    <div class="colors">
      <label v-for="color in colors" :key="color.id">
        <input type="checkbox" :value="color.id" v-model="colorsState" />
        <span :style="{ backgroundColor: color.color }"></span>
      </label>
    </div>
  </div>
</template>

<style lang="css" scoped>
.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  /*  */
  input {
    display: none;
  }

  /*  */
  span {
    width: 20px;
    height: 20px;
    border: 1px solid #949494;
    display: inline-block;
    cursor: pointer;

    /*  */
    input:checked + & {
      border-width: 3px;
      border-color: #559933;
    }
  }
}
</style>
