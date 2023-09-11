<template>
  <div class="consult-more">
    <van-popover placement="top-start" v-model:show="showPopover" :actions="actions" @select="onSelect">
      <template #reference>更多</template>
    </van-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  disabled?: boolean
}>()

const emits = defineEmits<{
  (e: 'on-delete'): void
  (e: 'on-preview'): void
}>()

const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: props.disabled },
  { text: '删除订单' }
])
const onSelect = (item: { text: string; disabled?: boolean }, i: number) => {
  if (i === 0) {
    emits('on-preview')
  }

  if (i === 1) {
    emits('on-delete')
  }
}
</script>
<style lang="scss" scoped>
.consult-more {
  flex: 1;
  color: var(--mt-tag);
  font-size: 13px;
}
</style>
