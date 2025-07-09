export const useEComFilterStore = defineStore('eComFilter', () => {
  // Фильтр цены
  const minPrice = ref(20);
  const maxPrice = ref(700);

  // Фильтр категории
  const categoryChecked = ref([]);

  // Фильтр по цвету
  const colors = ref([]);

  //
  return {
    minPrice,
    maxPrice,
    categoryChecked,
    colors,
  };
});
