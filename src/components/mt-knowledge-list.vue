<template>
  <div class="knowledge-list">
    <van-list v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <mt-knowledge-card v-for="(item, i) in list" :key="i" :item="item"/>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import type { KnowledgeType } from "@/types/consult"
import { getKnowledgePage } from '@/services/consult'
import type { KnowledgeList, KnowledgeParams } from '@/types/home-knowledge-type'

const props = defineProps<{
  type: KnowledgeType
}>()
import { ref } from 'vue';

const list = ref<KnowledgeList>([])
const loading = ref(false)
const finished = ref(false)
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10

})
const onLoad = async () => {
  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>
<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
