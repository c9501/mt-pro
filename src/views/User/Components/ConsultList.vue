<script setup lang="ts">
import ConsultItem from './ConsultItem.vue'
import { getConsultOrderList } from '@/services/consult'
import {ConsultType} from "@/enums/index"
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import { ref } from 'vue'

const props = defineProps<{
  type: ConsultType
}>()

const pageParams = ref<ConsultOrderListParams>({
  current: 1,
  pageSize: 10,
  type: props.type
})

const orderList = ref<ConsultOrderItem[]>([])

const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  let orderRes = await getConsultOrderList(pageParams.value)
  orderList.value?.push(...orderRes.data.rows)
  // 如果当前滚动的页码是总页码,加载完成
  if (pageParams.value.current < orderRes.data.pageTotal) {
    pageParams.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}
//删除
const handleDeleteOrder = (id: string | number) => {
  orderList.value = orderList.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="consult-list-page">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ConsultItem
        @on-delete="handleDeleteOrder"
        :item="item"
        v-for="(item, index) in orderList"
        :key="index"
      ></ConsultItem>
    </van-list>
  </div>
</template>

<style lang="scss" scoped></style>
