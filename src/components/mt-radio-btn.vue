<template>
  <div class="radio-btn-page">
    <a href="javascript:;" class="item"
    :class="{ active: modelValue === item.value }"
    v-for="item, index in options"
    :key="index"
    @click="toggleItem(item.value)"
    >{{ item.label }}</a>
  </div>
</template>

<script setup lang="ts">
//子传父数据类型定义
defineProps<{
  options: {
    label: string
    value: number | string
  }[]
  modelValue?: string | number
}>()
//父传子ts
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const toggleItem = (value: string | number) => {
  emits('update:modelValue', value)
}
</script>
<style lang="scss" scoped>
.radio-btn-page {
  display: flex;
  flex-wrap: wrap;

  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    background-color: var(--mt-bg);
    border: 1px solid var(--mt-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--mt-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;

    &.active {
      border-color: var(--mt-primary);
      background-color: var(--mt-plain);
    }
  }
}
</style>
