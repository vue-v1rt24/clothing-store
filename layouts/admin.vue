<script setup lang="ts"></script>

<template>
  <div class="admin_panel">
    <NuxtRouteAnnouncer />

    <!--  -->
    <AdminDashboardHeader />

    <!--  -->
    <div class="admin_panel__content">
      <AdminDashboardAside />

      <main class="admin_panel__content__right">
        <slot />
      </main>
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
