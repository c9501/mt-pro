<template>
  <div class="consult-detail-page" v-if="detailInfo">
    <mt-nav-bar title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>图⽂问诊 {{ detailInfo.payment }} 元</h3>
        <span class="sta green">{{ detailInfo.statusValue }}</span>
        <p class="tip">服务医⽣信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ detailInfo.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell title="患者信息" :value="`${detailInfo.patientInfo?.name}|${detailInfo.patientInfo?.gender ? '男' : '女'}
                | ${detailInfo.patientInfo?.age}岁`" />
        <van-cell title="患病时⻓" :value="`${getIllnessTimeText(detailInfo.illnessTime as number)}`" />
        <van-cell title="就诊情况" :value="`${getConsultFlagText(detailInfo.consultFlag as number)}`" />
        <van-cell title="病情描述" :label="detailInfo.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy">复制</span>
            202201127465
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="detailInfo.createTime" />
        <van-cell title="应付款" :value="`￥${detailInfo.payment}`" />
        <van-cell title="优惠券" :value="`-￥${detailInfo.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${detailInfo?.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${detailInfo?.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <!-- <div class="detail-action van-hairline--top">
      <div class="price">
        <span>需付款</span>
        <span>￥39.00</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续⽀付</van-button>
    </div> -->

    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultPay">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ detailInfo.actualPayment }}</span>
      </div>
      <van-button type="default" round @click="cancelConsultOrder(detailInfo!)">取消问诊</van-button>
      <van-button type="primary" round @click="show = true">继续支付</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultWait">
      <van-button type="default" round  @click="cancelConsultOrder(detailInfo!)">取消问诊</van-button>
      <van-button type="primary" round :to="`/room?orderId=${detailInfo.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultChat">
      <van-button type="default" round v-if="detailInfo.prescriptionId">查看处方</van-button>
      <van-button type="primary" round :to="`/room?orderId=${detailInfo.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultComplete">
      <ConsultMore :disabled="!detailInfo.prescriptionId" @on-delete="handleDeleteOrder(detailInfo)"
        @on-preview="showPrescription(detailInfo.prescriptionId!)"></ConsultMore>
      <van-button type="default" round :to="`/room?orderId=${detailInfo.id}`">问诊记录</van-button>
      <van-button type="primary" round v-if="detailInfo.evaluateId">写评价</van-button>
      <van-button type="default" round v-else>查看评价</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultCancel">
      <van-button type="default" round>删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
  </div>
  <div class="consult-detail-page" v-else>
    <mt-nav-bar title="问诊详情" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>

  <mt-pay-sheet
    payCallback="room"
    v-model:show="show"
    :actualPayment="detailInfo?.actualPayment!"
    :onClose="onClose"
    :orderId="orderId"
  ></mt-pay-sheet>
</template>

<script setup lang="ts">
import { useCancelOrder } from '@/composable'
const { cancelConsultOrder } = useCancelOrder()
import { getOrderDetail } from '@/services/consult';
import type { ConsultOrderItem } from '@/types/consult';
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrderType } from "@/enums"
import ConsultMore from "./Components/ConsultMore.vue"
import useShowPrescription, { useDeleteOrder } from '@/composable';
import { useClipboard } from '@vueuse/core';
import { showConfirmDialog, showToast } from 'vant';
const route = useRoute()
const router = useRouter()
//获取订单id
const orderId = route.params.id as string

//获取订单详情数据
const detailInfo = ref<ConsultOrderItem>()

const initOrerDetail = async () => {
  const orderRes = await getOrderDetail(orderId)
  detailInfo.value = orderRes.data
}
initOrerDetail()
// 查看处方
const { showPrescription } = useShowPrescription()

// 删除订单
const { handleDeleteOrder } = useDeleteOrder(() => {
  router.push('/user/consult')
})
// 复制订单号
const { copy, isSupported } = useClipboard()
const onCopy = async () => {
  if (!isSupported) return showToast('未授权,不支持')
  await copy(detailInfo.value?.orderNo || '')
  showToast('已复制')
}
//支付
//控制支付方式弹窗显示与隐藏
import { userConsultStore } from '@/stores/consult';
const store = userConsultStore()
const show = ref(false)

// 关闭支付方式弹窗
const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--mt-primary)'
  })
    .then((res) => {
      return false
    })
    .catch((error) => {
      router.push('/user/consult')
      return true
    })
}
const loading = ref(false)
</script>
<style lang="scss" scoped>
.consult-detail-page {
  padding-top: 46px;

  .detail-head {
    height: 146px;
    position: relative;
    padding: 15px;
    &::before {
      content: '';
      width: 100%;
      height: 135px;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }

    .text {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 3px;

      .sta {
        color: var(--mt-tag);
        font-weight: 500;
        font-size: 16px;
        &.green {
          color: var(--mt-primary);
        }
        &.orange {
          color: #f2994a;
        }
      }

      .tip {
        width: 100%;
        color: var(--mt-text3);
        margin-top: 5px;
      }
    }
  }

  .card {
    display: flex;
    align-items: center;
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);

    .avatar {
      width: 38px;
      height: 38px;
    }

    .doc {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 15px;

      > span {
        font-size: 16px;

        &:last-child {
          font-size: 13px;
          color: var(--mt-text3);
        }
      }
    }
  }

  .detail-patient {
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--mt-bg);
    }
  }

  .detail-order {
    > h3 {
      padding: 10px 18px;
      font-weight: normal;
    }
    .copy {
      padding: 2px 10px;
      border: 1px solid var(--mt-primary);
      background-color: var(--mt-plain);
      color: var(--mt-primary);
      font-size: 12px;
      border-radius: 12px;
      margin-right: 10px;
    }
    :deep(.van-cell__title) {
      width: 70px;
      flex: none;
    }
    .price :deep(.van-cell__value) {
      font-size: 16px;
      color: var(--mt-price);
    }
  }

  .detail-action {
    height: 65px;
    width: 100%;
    position: fixed;
    left: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    bottom: 0;
    padding: 0 15px;
    box-sizing: border-box;

    .price {
      flex: 1;

      > span:last-child {
        font-size: 18px;
        color: var(--mt-price);
        padding-left: 5px;
      }
    }

    .van-button {
      margin-left: 10px;
      padding-left: 17px;
      padding-right: 17px;
    }
    :deep(.van-button--default) {
      background-color: var(--mt-bg);
      color: var(--mt-text3);
    }
  }
  .van-cell {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
