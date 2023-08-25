<template>
  <div class="nav">
    <van-nav-bar
      @click-left="onClickLeft"
      :title="title"
      @click-right="onClickRight"
      left-arrow
      fixed
      :right-text="rightText"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
//父传子
const props = defineProps({
  title: String,
  rightText: String
})
const router = useRouter()
const onClickLeft = () => {
  // 判断是否有历史记录,有: 返回上一页, 没有:则进入主页
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
// 子传父
const emits = defineEmits(['click-right'])
const onClickRight = () => {
  emits('click-right')
}
</script>
<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--mt-text1);
    }
    &__text {
      font-size: 15px;
      color: var(--mt-primary);
    }
  }
}
</style>
