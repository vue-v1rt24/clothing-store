<script setup lang="ts">
import { OModalsContainer } from '@outloud/vue-modals';
import { useModals } from '@outloud/vue-modals';

const modals = useModals();
const $content = ref<HTMLElement>();

modals.content = $content;
</script>

<template>
  <div class="admin_panel">
    <NuxtRouteAnnouncer />

    <!--  -->
    <AdminDashboardHeader />

    <!--  -->
    <div class="admin_panel__content">
      <AdminDashboardAside />

      <main class="admin_panel__content__right" ref="$content">
        <slot />
      </main>

      <OModalsContainer />
    </div>
  </div>
</template>

<style lang="css" scoped>
.admin_panel {
  min-height: 100vh;
  background-color: #f0f0f0;
}

/*  */

.admin_panel__content {
  position: relative;
  min-height: 100vh;
}

.admin_panel__content__right {
  padding: 77px 20px 20px 20px;
  margin-left: var(--headerLeftWidth);
}
</style>
