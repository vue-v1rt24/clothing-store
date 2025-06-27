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
export type TypeColor = {
  id: string;
  name: string;
};

// Для загруженных изображений товара
export type TypeUploadImage = {
  id: string;
  url: string;
  productId: string;
};

export type TypeProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  categoryId: string;
  colorId: string;
  createdAt: string;
  updatedAt: string;
  category: TypeCategory;
  color: TypeColor;
  image: TypeUploadImage[];
};

// ================= Страница админки "Пользователи"

// ================= Общие

// Для загрузки данных по кнопке "Показать ещё"
export type TypeUploadContentData<T> = { items: T[]; cursorId: string };
