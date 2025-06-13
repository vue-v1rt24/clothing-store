<script setup lang="ts">
import type { TypeUser } from '~/types/admin.types';

//
const user = useCookie<TypeUser>('user');

//
const openProfile = ref(false);
</script>

<template>
  <ul class="header_admin">
    <li class="header_admin__left">
      <span class="header_admin__left__title">Админка</span>
    </li>
    <li class="header_admin__right">
      <div class="header_admin__right_title">Добро пожаловать!</div>

      <!--  -->
      <div
        :class="['header_admin__right_avatar', { open: openProfile }]"
        @click.self="openProfile = !openProfile"
      >
        <div class="header_admin__right_avatar__modal">
          <span class="header_admin__right_avatar__modal_if">{{ user.name }}</span>
          <span class="header_admin__right_avatar__modal_email">{{ user.email }}</span>
          <hr class="header_admin__right_avatar__modal_hr" />
          <button type="button" class="header_admin__right_avatar__modal_btn">Выйти</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="css" scoped>
.header_admin {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  height: var(--headerHeight);
  background-color: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;
}

/*  */

.header_admin__left {
  flex-shrink: 0;
  width: var(--headerLeftWidth);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #ececec;
  padding-left: 30px;
}

.header_admin__left__title {
  font-size: 24px;
  font-weight: 600;
}

/*  */

.header_admin__right {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 20px;
  isolation: isolate;

  /*  */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 2px 3px 5px 1px #dfdddd;
    z-index: -1;
  }
}

.header_admin__right_title {
  font-size: 20px;
}

/*  */

.header_admin__right_avatar {
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #ebebeb;
  border-radius: 50%;
  cursor: pointer;
}

.header_admin__right_avatar__modal {
  position: absolute;
  top: 50px;
  right: 0;
  min-width: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  cursor: default;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  transform: translateY(-10px);
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;

  /*  */
  .header_admin__right_avatar.open & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    z-index: 1;
  }
}

.header_admin__right_avatar__modal_if {
  font-size: 14px;
  font-weight: 600;
}

.header_admin__right_avatar__modal_email {
  color: #9b9393;
}

.header_admin__right_avatar__modal_hr {
  width: 100%;
  border-color: #ececec;
}

.header_admin__right_avatar__modal_btn {
  background-color: transparent;
  border: none;
}
</style>
