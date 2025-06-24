<script setup lang="ts">
import type { TypeUploadImage } from '~/types/admin.types';

//
const { images } = defineProps<{
  images: TypeUploadImage[];
}>();

const emit = defineEmits<{
  successRemoveImgProduct: [];
}>();

// Помещаем изображения из props в локальную переменную
const localImgs = ref(images);

// Модальное окно
const modals = useModals();

// Удаляем изображение
const removeImg = async (evt: Event) => {
  const target = evt.target as HTMLUListElement;

  const parent = target.closest('.upload_file__item') as HTMLLinkElement;
  if (!parent) return;

  const id = parent.dataset.id as string;
  if (!id) return;

  //
  const confirm = await modals.open(import('~/components/UI/Confirm.vue'), {
    props: {
      title: 'Удалить изображение товара?',
      text: 'Важно: необратимое действие',
    },
  });

  if (!confirm) return;

  //
  try {
    const res = await $fetch('/api/admin/product/removeUploadImg', {
      method: 'DELETE',
      headers: useHeaders(),
      query: {
        id,
      },
    });

    // Удаляем изображение из локальной переменной
    localImgs.value = localImgs.value.filter((item) => item.id !== id);

    // Отправляем событие
    emit('successRemoveImgProduct');

    // Выводим сообщение
    successMsg(res.message);
  } catch (error: any) {
    errorMsg(error.data.message);
  }
};
</script>

<template>
  <UIModal>
    <div class="upload_file">
      <div class="upload_file__title">Загруженные изображения</div>

      <!--  -->
      <ul v-if="localImgs.length" class="upload_file__list" @click="removeImg">
        <li
          v-for="image in localImgs"
          :key="image.id"
          :data-id="image.id"
          class="upload_file__item"
        >
          <span class="upload_file__list_remove">x</span>

          <img
            :src="`/uploads/${image.url}`"
            alt="Изображение товара"
            class="upload_file__item_image"
          />
        </li>
      </ul>

      <div v-else>У товара пока нет загруженных изображений</div>
    </div>
  </UIModal>
</template>

<style lang="css" scoped>
.upload_file {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

/*  */

.upload_file__title {
  font-size: 24px;
}

/*  */

.upload_file__list {
  max-height: 410px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 130px;
  gap: 10px;
  overflow-y: auto;
}

.upload_file__item {
  position: relative;
  cursor: pointer;

  /*  */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.9);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 0.5;
  }
}

.upload_file__item_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload_file__list_remove {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;

  /*  */
  .upload_file__item:hover & {
    opacity: 1;
  }
}
</style>
