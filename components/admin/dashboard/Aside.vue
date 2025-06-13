<script setup lang="ts">
const links = [
  { name: 'Главная', link: '/admin/dashboard' },
  { name: 'Категории', link: '/admin/categories' },
  { name: 'Товары', link: '/admin/products' },
  { name: 'Оплата', link: '/admin/payments' },
  { name: 'Пользователь', link: '/admin/users' },
];
</script>

<template>
  <div class="admin_aside">
    <ul class="menu">
      <li v-for="link in links" :key="link.name" class="menu__item">
        <NuxtLink :to="link.link">
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.admin_aside {
  position: fixed;
  top: 60px;
  width: var(--headerLeftWidth);
  height: calc(100% - 60px);
  background-color: white;
  border-right: 1px solid #ececec;
  z-index: 1;

  /*  */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    box-shadow: 2px 0 5px 1px #dfdddd;
  }
}

/*  */

.menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px 10px 20px 10px;
  overflow-y: auto;
}

.menu__item {
  a {
    width: 100%;
    height: 40px;
    color: black;
    background-color: transparent;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding-left: 20px;
    transition: color 0.3s, background-color 0.3s, padding-left 0.3s;

    /*  */
    &.active,
    &:hover {
      color: white;
      background-color: #00bfff;
      padding-left: 30px;
    }
  }
}
</style>
