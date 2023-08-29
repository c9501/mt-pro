<template>
  <div class="layout-page">
    <RouterView />
    <van-tabbar route>
      <van-tabbar-item to="/home">⾸⻚
        <template #icon="{ active }">
          <mt-icons :name="active ? 'home-index-active' : 'home-index-default'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">健康百科
        <template #icon="{ active }">
          <mt-icons :name="active ? 'home-article-active' : 'home-article-default'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        消息中⼼
        <template #icon="{ active }">
          <mt-icons :name="active ? 'home-notice-active' : 'home-notice-default'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        我的
        <template #icon="{ active }">
          <mt-icons :name=" active ? 'home-mine-active' : 'home-mine-default'" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.layout-page {
  ::v-deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }

      &__text {
        font-size: 11px;
      }
      &--active{
        // color: var(--mt-primary);
        color: green;
      }
    }
  }
}
</style>
