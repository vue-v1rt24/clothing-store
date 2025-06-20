<script setup lang="ts">
import { useModals } from '@outloud/vue-modals';
import type { TypeProduct, TypeCategory } from '~/types/admin.types';

//
definePageMeta({
  layout: 'admin',
});

//
const route = useRoute();

//
const loading = ref(false);

// Для поиска товара
const search = ref(route.query.search);

// Получение всех товаров
const { data: products, refresh: refreshProducts } = await useFetch('/api/admin/product/select', {
  query: {
    search,
  },
});

// Получение всех категорий
const { data: cats, refresh: refreshCategories } = await useFetch('/api/admin/category/select');

// Модальное окно
const modals = useModals();

const create = async (
  title = 'Создать товар',
  btnTitle = 'Создать',
  product: TypeProduct | null = null,
  categories: TypeCategory[] | undefined = cats.value?.categories,
  type = false,
) => {
  const res = await modals.open(import('~/components/admin/products/CreateProductModal.vue'), {
    props: {
      title,
      btnTitle,
      product,
      categories,
      type,
    },
  });

  if (res) {
    refreshProducts();
  }
};

// Редактирование товара
const editProduct = (product: TypeProduct) => {
  create('Редактировать товар', 'Редактировать', product, cats.value?.categories, true);
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
    const res = await $fetch('/api/admin/product/delete', {
      method: 'DELETE',
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

// Показ всех изображений товара
const showUploadImages = async (product: TypeProduct) => {
  await modals.open(import('~/components/admin/products/ShowUploadImagesModal.vue'), {
    props: {
      images: product.image,
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

  search.value = val;
};

// === Кнопка "Показать ещё" ===

// Для вывода кнопки
const moreBtn = ref(products.value?.cursorId);

// Клик по кнопке
const moreHandler = async () => {
  loading.value = true;

  try {
    // Получение всех товаров
    const res = await $fetch('/api/admin/product/select', {
      query: {
        more: 'load',
        search: search.value,
      },
    });

    // console.log(res);

    // Добавляем товары
    products.value?.products.push(...res.products);

    // Установка значения для кнопки "Показать ещё"
    moreBtn.value = res.cursorId;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// === /Кнопка "Показать ещё" ===

// Отслеживание получения товаров
watch(products, () => {
  // Установка значения для кнопки "Показать ещё"
  moreBtn.value = products.value?.cursorId;
});
</script>

<template>
  <div>
    <div class="product_controls">
      <!-- Кнопка создания товара -->
      <UIButton width="150px" title="Создать" @btn-handler="create" />

      <!-- Кнопка поиска -->
      <UISearch @search-handler="searchHandler" />
    </div>

    <!--  -->
    <div class="content">
      <AdminProductsTable
        v-if="products?.products.length"
        :products="products.products"
        @edit-product="editProduct"
        @delete-product="deleteProduct"
        @upload-image="uploadImage"
        @show-upload-images="showUploadImages"
      />

      <div v-else>Товаров пока нет</div>

      <!-- Кнопка показать ещё -->
      <UIButton
        v-if="moreBtn"
        title="Загрузить ещё"
        :loading
        @btn-handler="moreHandler"
        class="btn_load"
      />
    </div>
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
}

/*  */

.btn_load {
  margin-top: 30px;
}
</style>
