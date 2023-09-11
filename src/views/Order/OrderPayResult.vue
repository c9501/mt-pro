<script setup lang="ts">
import { getMedicalOrderDetail } from '@/services/order'
import type { OrderDetailResponseType } from '@/types/order'
import { OrderType } from '@/enums'
import { useRoute } from 'vue-router'
import { useMedicineOrderDetail } from '@/composable'
import { ref } from 'vue'

const route = useRoute()
const { item } = useMedicineOrderDetail(route.query.orderId as string)

// const item = ref<OrderDetailResponseType>()
// const initMedicineOrderDetail = async () => {
//   const OrderDetailRes = await getMedicalOrderDetail(route.query.orderId as string)
//   console.log('OrderDetailRes', OrderDetailRes)
//   item.value = OrderDetailRes.data
// }
// initMedicineOrderDetail()
</script>

<template>
  <div class="order-pay-result-page">
    <mt-nav-bar title="药品支付结果" />
    <div class="result" v-if="item?.status === OrderType.MedicinePay">
      <van-icon name="clear" />
      <p class="price">￥ {{ item?.actualPayment }}</p>
      <p class="status">支付失败</p>
      <p class="tip">订单支付失败，可以点击查看订单继续支付，如有疑问联系客服~</p>
    </div>
    <div class="result" v-else>
      <van-icon name="checked" />
      <p class="price">￥ {{ item?.actualPayment }}</p>
      <p class="status">支付成功</p>
      <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
    </div>

    <div class="btn">
      <van-button type="primary" :to="`/order/${item?.id}`">查看订单</van-button>
      <van-button :to="`/room?orderId=${item?.roomId}`">返回诊室</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 46px;

  .result {
    display: flex;
    flex-direction: column;
    align-items: center;

    .van-icon {
      font-size: 75px;
      margin-top: 60px;

    }
    .van-icon-clear {
      color: var(--mt-price);
    }
    .van-icon-checked {
      color: var(--mt-primary);
    }

    .price {
      font-size: 22px;
      margin-top: 10px;
    }

    .status {
      color: var(--mt-text3);
    }
    .tip {
      color: var(--mt-tip);
      width: 240px;
      text-align: center;
      margin-top: 20px;
    }
  }

  .btn {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    .van-button--primary {
      margin-right: 20px;
    }
  }
}
</style>
