<script setup lang="ts">
import { createConsultOrder, getConsultOrderPre, getConsultOrderUrl } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { userConsultStore } from '@/stores/consult'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { showConfirmDialog, showDialog, showLoadingToast, showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
const router = useRouter()
const store = userConsultStore()
const payInfo = ref<ConsultOrderPreData>()
//获取订单信息
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  payInfo.value = res.data
  // 设置默认优惠券
  store.setCoupon(payInfo.value.couponId)
}
const patient = ref<Patient>()
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  patient.value = res.data
}
onMounted(() => {
  loadData()
  loadPatient()
})
//加载状态
const loading = ref(false)
//支付协议状态
const agree = ref(false)
//支付选项弹框
const show = ref(false)
//弹框选项
const paymentMethod = ref<0 | 1>()
//订单id
const orderId = ref('')
const submit = async () => {
  if (!agree.value) return showToast('请勾选支付协议')
  loading.value = true
  const res = await createConsultOrder(store.consult)
  orderId.value = res.data.id
  loading.value = false
  store.clear()

  //打开弹框
  show.value = true
}
//生成订单不可回退
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
//关闭弹框
const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: "var(--mt-primary)"

  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
//跳转支付
// const pay = async () => {
//   if (paymentMethod.value === undefined) return showToast('请选择支付方式')
//   showLoadingToast('跳转支付')
//   const res = await getConsultOrderUrl({
//     orderId: orderId.value,
//     paymentMethod: paymentMethod.value,
//     payCallback: 'http://localhost:5173/#/room'
//   })
//   window.location.href = res.data.payUrl
// }
//页面刷新
onMounted(() => {
  if (
    !store.consult.type ||
    !store.consult.illnessType ||
    !store.consult.depId ||
    !store.consult.patientId
  ) {
    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  loadData()
  loadPatient()
})
</script>
<template>
  <div class="consult-pay-page" v-if="payInfo">
    <mt-nav-bar title="⽀付" />
    <div class="pay-info">
      <p class="tit">图⽂问诊{{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>⾃动分配医⽣</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo?.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell title="患者信息" :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age}岁`"></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">⽀付协议</span></van-checkbox>
    </div>
    <van-submit-bar button-type="primary" @click="submit" :price="payInfo.actualPayment * 100" button-text="⽴即⽀付"
      :loading="loading" text-align="left" />
    <!-- 弹框 -->
    <!-- <van-action-sheet v-model:show="show"
    @close="onClose"
    title="选择支付方式" :close-on-popstate="false" :closeable="false">
      <div class="pay-type">
        <p class="amount">
          ￥{{ payInfo.actualPayment.toFixed(2) }}
        </p>
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
          <van-button type="primary" round block @click="pay">立即支付</van-button>
        </div>
      </div>

    </van-action-sheet> -->
    <mt-pay-sheet payCallback="room" v-model:show="show" :actualPayment="payInfo?.actualPayment!" :onClose="onClose"
      :orderId="orderId"></mt-pay-sheet>
  </div>
  <div v-else class="consult-pay-page">
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
  </div>
</template>
<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;

  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;

    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
    }

    border-radius: 4px;
    overflow: hidden;
  }

  .desc {
    flex: 1;

    >span {
      display: block;
      color: var(--mt-tag);

      &:first-child {
        font-size: 16px;
        color: var(--mt-text2);
      }
    }
  }

  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }

      .van-cell__value {
        font-size: 16px;
        color: var(--mt-price);
      }
    }
  }

  .pay-space {
    height: 12px;
    background-color: var(--mt-bg);
  }

  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      color: var(--mt-primary);
    }
  }

  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }

  .pay-type {
    .amount {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    .btn {
      padding: 15px;
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
  }
}
</style>
