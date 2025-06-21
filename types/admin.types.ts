// ================= Пользователь
export type TypeUser = {
  id: string;
  email: string;
  name: string;
  isValidEmail?: number;
};

// ================= Страница админки "Категории"
export type TypeCategory = {
  id: string;
  name: string;
};

// Ответ с сервера
export type TypeResponseCategory = {
  message: string;
  category: {
    id: string;
    name: string;
  };
};

// ================= Страница админки "Товары"
export type TypeProduct = {
  id: string;
  name: string;
  color: string;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  image: {
    id: string;
    url: string;
    productId: string;
  }[];
};

// Для загруженных изображений товара
export type TypeUploadImage = {
  id: string;
  url: string;
  productId: string;
};

// ================= Страница админки "Пользователи"

// ================= Общие

// Для загрузки данных по кнопке "Показать ещё"
export type TypeUploadContentData<T> = { items: T[]; cursorId: string };
