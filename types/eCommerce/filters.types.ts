export type AllFilters = {
  priceMinMax: [number, number];
  categories: CategoryFilter[];
  colors: ColorFilter[];
};

export type CategoryFilter = {
  id: string;
  name: string;
  slug: string;
};

export type ColorFilter = {
  id: string;
  name: string;
  color: string;
};
