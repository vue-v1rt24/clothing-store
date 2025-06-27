// Товар
export type TypeProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  color: {
    name: string;
  };
  image: {
    url: string;
  }[];
};

// Товары с постраничной навигацией
export type TypeProductPaginate = {
  cursorId: string;
  product: TypeProduct[];
};
