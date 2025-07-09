<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header class="header">
    <div class="logo">
      <NuxtLink v-if="route.path !== '/'" to="/">
        <ImgLogo />
      </NuxtLink>

      <ImgLogo v-else />
    </div>

    <div class="header__right">
      <div class="header__right_user">
        <ImgUser />
      </div>

      <div class="header__right_cart" data-count="12">
        <ImgCart />
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.header {
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 #ccc;
  padding: 0 30px;
  margin-bottom: 30px;
}

/*  */

.logo {
  svg {
    fill: #0cd465;
  }
}

/*  */

.header__right {
  display: flex;
  column-gap: 15px;
}

/*  */

.header__right_user {
  cursor: pointer;
}

/*  */

.header__right_cart {
  position: relative;
  cursor: pointer;

  /*  */
  &::after {
    content: attr(data-count);
    position: absolute;
    top: -10px;
    right: -7px;
    width: 20px;
    height: 20px;
    font-size: 10px;
    text-indent: -2px;
    color: white;
    background-color: #0cd465;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    overflow: hidden;
  }
}
</style>
