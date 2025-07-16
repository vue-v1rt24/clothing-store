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

// Товар с полной информацией (вывод на отдельной странице)
type TypeProd = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: {
    name: string;
  };
  image: {
    url: string;
  }[];
  color: {
    name: string;
  };
};

export type TypeProductFull = {
  product: TypeProd;
  productsCategory: TypeProd[];
};
