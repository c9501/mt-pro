<template>
  <svg aria-hidden="true" class="mt-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
//父传子
defineProps<{
  name: string
}>()
</script>

<style lang="scss" scoped>
// 图标大小
.mt-icon {
  width: 1em;
  height: 1em;
}
</style>
