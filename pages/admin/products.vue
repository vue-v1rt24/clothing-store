<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type {
  TypeProduct,
  TypeColor,
  TypeCategory,
  TypeUploadContentData,
} from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

//
const route = useRoute();

// Для поиска товара
const search = ref(route.query);

// Получение всех товаров
const {
  data: products,
  refresh: refreshProducts,
  error: errorSelect,
} = await useFetch('/api/admin/product/select', {
  headers: useHeaders(),
  query: {
    params: search,
  },
});

// Если нет авторизации
if (errorSelect.value?.statusCode === 401) {
  await navigateTo({
    path: '/auth/login',
    query: {
      message: 'login',
    },
  });
}

// Модальное окно создания товара
const modals = useModals();

const create = async (
  title = 'Создать товар',
  btnTitle = 'Создать',
  product: TypeProduct | null = null,
  categories: TypeCategory[] | undefined = products.value?.categories,
  colors: TypeColor[] | undefined = products.value?.colors,
  type = false,
) => {
  const res = await modals.open(import('~/components/admin/products/CreateProductModal.vue'), {
    props: {
      title,
      btnTitle,
      product,
      categories,
      colors,
      type,
    },
  });

  if (res) {
    refreshProducts();
  }
};

// Редактирование товара
const editProduct = (product: TypeProduct) => {
  create(
    'Редактировать товар',
    'Редактировать',
    product,
    products.value?.categories,
    products.value?.colors,
    true,
  );
};

// Удаление товара
const deleteProduct = async (product: TypeProduct) => {
  const confirm = await modals.open(import('~/components/UI/Confirm.vue'), {
    props: {
      title: 'Удалить запись?',
      text: 'Важно: необратимое действие',
    },
  });

  if (!confirm) return;

  //
  try {
    const res = await $fetch('/api/admin/product/removeProduct', {
      method: 'DELETE',
      headers: useHeaders(),
      query: {
        id: product.id,
      },
    });

    refreshProducts();

    successMsg(res.message);
  } catch (error: any) {
    errorMsg(error.data.message);
  }
};

// Загрузка изображения
const uploadImage = async (product: TypeProduct) => {
  const res = await modals.open(import('~/components/admin/products/UploadImageModal.vue'), {
    props: {
      productId: product.id,
    },
  });

  if (res) {
    refreshProducts();
  }
};

// Показ всех изображений товара / Удаление изображения товара
const showUploadImages = async (product: TypeProduct) => {
  await modals.open(import('~/components/admin/products/ShowUploadImagesModal.vue'), {
    props: {
      images: product.image,
    },
    listeners: {
      successRemoveImgProduct: refreshProducts,
    },
  });
};

// Поиск товара
const searchHandler = async (val: string) => {
  await navigateTo({
    query: {
      search: val,
    },
  });

  search.value = { search: val };
};

// === Кнопка "Показать ещё"
// Курсор постраничной навигации
const cursorId = ref(products.value?.cursorId);

const uploadContentHandler = (uploadData: TypeUploadContentData<TypeProduct>) => {
  // Добавляем товары
  products.value?.items.push(...uploadData.items);

  // Установка значения курсора постраничной навигации
  cursorId.value = uploadData.cursorId;
};

// Отслеживание получения товаров
watch(products, () => {
  // Установка значения курсора постраничной навигации
  cursorId.value = products.value?.cursorId;
});
// === /Кнопка "Показать ещё"
</script>

<template>
  <div>
    <div class="product_controls">
      <!-- Кнопка создания товара -->
      <UIButton width="150px" title="Создать" @btn-handler="create" />

      <!-- Кнопка поиска -->
      <UISearch v-if="products?.items.length" @search-handler="searchHandler" />
    </div>

    <!--  -->
    <div class="content">
      <AdminProductsTable
        v-if="products?.items.length"
        :products="products.items"
        @edit-product="editProduct"
        @delete-product="deleteProduct"
        @upload-image="uploadImage"
        @show-upload-images="showUploadImages"
      />

      <div v-else>Товаров пока нет</div>
    </div>

    <!-- Кнопка показать ещё -->
    <!-- @vue-generic {import('@/types/admin.types').TypeProduct} -->
    <UIUploadingContent
      v-if="cursorId"
      url="/api/admin/product/select"
      :headers="useHeaders()"
      :cursor-id="cursorId"
      :params="search"
      @upload-content-handler="uploadContentHandler"
    />
  </div>
</template>

<style lang="css" scoped>
.product_controls {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

/*  */

.content {
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
