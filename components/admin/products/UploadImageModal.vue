<script setup lang="ts">
const { productId } = defineProps<{
  productId: string;
}>();

//
const { close } = useModal();

const { handleFileInput, files } = useFileStorage();

const imagePreview = useTemplateRef('imagePreview');

const isLoadImg = ref(false);

// Запрос
const handlerSaveImg = async (evt: Event) => {
  try {
    const res = await $fetch('/api/admin/product/uploadImage', {
      method: 'POST',
      body: {
        productId,
        files: files.value,
      },
    });

    // Закрытие модального окна
    close(true);

    // Сообщение
    successMsg(res.message);
  } catch (error: any) {
    error?.data?.message && errorMsg(error.data.message);
  }
};

// Следим за выбором файла изображения в поле инпута
watch(files.value, async (val) => {
  if (!val[0]?.content || !imagePreview.value) return;

  // Вставляем путь выбранного изображения для просмотра
  imagePreview.value.src = val[0].content as string;

  // Показываем блок с выбранным изображением
  isLoadImg.value = true;
});
</script>

<template>
  <UIModal>
    <form class="upload_file" @submit.prevent="handlerSaveImg">
      <div class="upload_file__title">Загрузить изображение</div>

      <div :style="{ display: isLoadImg ? 'block' : 'none' }" class="image_preview">
        <img src="" alt="" ref="imagePreview" />
      </div>

      <input
        type="file"
        @change="handleFileInput"
        multiple
        accept=".png, .jpg, .jpeg, .gif, .webp, .avif"
      />

      <UIButton type="submit" title="Добавить" :loading="!isLoadImg" />
    </form>
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
.image_preview {
  height: 200px;

  /*  */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
