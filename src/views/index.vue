<template>
  <div class="indexbox">
    <span> {{ aa }} </span>
    <span> {{ bb }} </span>
    <button class="btn" @click="add">登录</button>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
const { aa } = useUserStore()
const bb = ref(0)
const add = () => {
  bb.value += aa * 2
}
</script>
<style lang="scss" scoped>
.btn {
  width: 200px;
}
</style>
