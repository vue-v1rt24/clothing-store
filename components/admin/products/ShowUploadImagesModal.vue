<script setup lang="ts">
import type { TypeUploadImage } from '~/types/admin.types';

//
defineProps<{
  images: TypeUploadImage[];
}>();
</script>

<template>
  <UIModal>
    <div class="upload_file">
      <div class="upload_file__title">Загруженные изображения</div>

      <!--  -->
      <ul v-if="images.length" class="upload_file__list">
        <li v-for="image in images" :key="image.id" class="upload_file__item">
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.upload_file__item_image {
  height: 100px;
}
</style>
