<script setup lang="ts"></script>

<template>
  <div class="login">
    <mt-nav-bar
      right-text="注册"
      title="登录"
      @click-right="$router.push('/register')"
    ></mt-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
