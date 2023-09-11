<script setup lang="ts">
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enums'
import { ref, computed } from 'vue'
import { cancelOrder, deleteOrder } from '@/services/consult'
import { showToast } from 'vant'
import ConsultMore from "./ConsultMore.vue"
import useShowPrescription, { useDeleteOrder } from '@/composable'
const props = defineProps<{
  item: ConsultOrderItem
}>()

const emits = defineEmits<{
  (e: 'on-delete', id: number | string): void
}>()

/**
 * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
 */
// const orderStatusList = [
//   { type: 1, value: '待支付' },
//   { type: 2, value: '待接诊' },
//   { type: 3, value: '咨询中' },
//   { type: 4, value: '已完成' },
//   { type: 5, value: '已取消' }
// ]
// const filterOrderStatus = (status: number) => {
//   const data = orderStatusList.find((item) => item.type === status)
//   return data?.value
// }
//弹框开关
// const showPopover = ref(false)
// const actions = computed(() => [
//   { text: '查看处方', disabled: !props.item.prescriptionId },
//   { text: '删除订单' }
// ])
// const onSelect = (it: { text: string; disabled?: boolean }) => {
//   if (it.text === '查看处方') {
//     showPrescription(props.item.prescriptionId as number | string)
//   }  else if (it.text === '删除订单') { handleDeleteOrder(props.item) }
// }
import { useCancelOrder } from '@/composable'
const { loading, cancelConsultOrder } = useCancelOrder()
// 取消问诊
// const loading = ref(false)
// const handleCancelOrder = async (item: ConsultOrderItem) => {
//   loading.value = true

//   try {
//     await cancelOrder(item.id)
//     item.status = OrderType.ConsultCancel
//     item.statusValue = '已取消'
//     showToast('取消成功')
//   } catch (error) {
//     showToast('取消失败')
//   } finally {
//     loading.value = false
//   }
// }

// 删除订单
// const deleteLoading = ref(false)
// const handleDeleteOrder = async (item: ConsultOrderItem) => {
//   deleteLoading.value = true
//   try {
//     await deleteOrder(item.id)
//     emits('on-delete', item.id)
//     showToast('删除成功')
//   } catch (error) {
//     showToast('删除失败')
//   } finally {
//     deleteLoading.value = false
//   }
// }
const {  handleDeleteOrder } = useDeleteOrder((id) => {
  emits('on-delete', id)
})
// 查看处方
const { showPrescription } = useShowPrescription()
</script>

<template>
  <div class="consult-item-page">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p>{{ item.docInfo?.name || '极速问诊（自动分配医生）' }}</p>
      <span>{{ item.statusValue }}</span>
    </div>
    <div class="body" @click="$router.push(`/user/consult/${item.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button type="default" round :loading="loading"  size="small"
@click="cancelConsultOrder(item!)">取消问诊</van-button>
      <van-button type="primary" plain size="small" round
      @click="$router.push(`/user/consult/${item.id}`)">去支付</van-button>
    </div>
    <div class="foot" v-else-if="item.status === OrderType.ConsultWait">
      <van-button type="default" round :loading="loading"  size="small"
@click="cancelConsultOrder(item!)">取消问诊</van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultChat">
      <van-button v-if="item.prescriptionId" class="gray" plain size="small" round
        @click="showPrescription(item.prescriptionId)">
        查看处方
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultComplete">
      <div class="more">
        <!-- 气泡弹框 -->
        <!-- <van-popover placement="top-start" v-model:show="showPopover" :actions="actions" @select="onSelect">
          <template #reference> 更多 </template>
        </van-popover> -->
        <ConsultMore
        :disabled="!item.prescriptionId"
        @onDelete="handleDeleteOrder(item)"
        @onPreview="showPrescription(item.prescriptionId!)"
      ></ConsultMore>
      </div>
      <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!item.evaluateFlag" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button class="gray" plain size="small" round @click="handleDeleteOrder(item)">删除订单</van-button>
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item-page {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;

  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;

    .img {
      width: 20px;
      height: 20px;
    }

    p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }

    > span {
      color: var(--mt-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--mt-primary);
      }
    }
  }

  .body {
    padding: 15px 15px 8px 15px;

    .body-row {
      display: flex;
      margin-bottom: 7px;

      .body-label {
        width: 62px;
        font-size: 13px;
        color: var(--mt-tip);
      }
      .body-value {
        width: 250px;
        &.tip {
          color: var(--mt-tip);
        }
      }
    }
  }

  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--mt-text3);
        background-color: var(--mt-bg);
      }
    }
    .more {
      color: var(--mt-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
