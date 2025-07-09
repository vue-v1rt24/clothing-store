<script setup lang="ts">
import { useEComFilterStore } from '~/stores/eCommerce/filters';
import type { ColorFilter } from '~/types/eCommerce/filters.types';

//
defineProps<{
  colors: ColorFilter[];
}>();

//
const store = useEComFilterStore();
const { colors: colorsState } = storeToRefs(store);
</script>

<template>
  <div>
    <h2 class="filter__h2">Цвет</h2>

    <div class="colors">
      <label v-for="color in colors" :key="color.id">
        <input type="checkbox" :value="color.id" v-model="colorsState" />
        <span :class="color.name"></span>
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

/*  */
.Белый {
  background-color: #fff;
}

.Красный {
  background-color: #f00;
}

.Серый {
  background-color: #808080;
}

.Чёрный {
  background-color: #000;
}
</style>
