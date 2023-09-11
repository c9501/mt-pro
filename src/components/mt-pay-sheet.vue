<script setup lang="ts">
import { getConsultOrderUrl } from '@/services/consult'
import { showToast } from 'vant'
import { ref } from 'vue'

const props = defineProps<{
  show: boolean
  orderId: string
  actualPayment: number
  onClose?: () => void
  payCallback: string
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()

// 支付方法 1 支付宝支付 0 微信支付
const paymentMethod = ref<0 | 1>()
// 发起支付
const handlePay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')

  const payRes = await getConsultOrderUrl({
    paymentMethod: paymentMethod.value,
    orderId: props.orderId,
    payCallback: 'http://localhost:5173/#/'+ props.payCallback
  })

  window.location.href = payRes.data.payUrl
}
</script>

<template>
  <van-action-sheet
    :beforeClose="onClose"
    :closeable="false"
    :show="show"
    @update:show="emit('update:show', $event)"
    title="选择支付方式"
    :close-on-popstate="false"
  >
    <div class="pay-type">
      <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><mt-icons name="consult-wechat" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><mt-icons name="consult-alipay" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="handlePay">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  .van-cell {
    align-items: center;
    .mt-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }

  .btn {
    padding: 15px;
  }
}
</style>
