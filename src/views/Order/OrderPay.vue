<script setup lang="ts">
import { createMedicalOrder, getAdderss, getMedicineInfo } from '@/services/order'
import type { MedicineResponseType, addressResponseType } from '@/types/order'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
const route = useRoute()
// 获取处方id
const prescriptionId = route.query.id && route.query.id

// 控制是否同意协议 false 不同意 true 同意
const agree = ref(false)

// loading
const loading = ref(false)

// 立即支付按钮处发的方法
const show = ref(false)
const medicalOrderId = ref<string>()
const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选支付协议')
  if (!address.value?.id) return showToast('请选择收货地址')
  if (!prescriptionId) return showToast('未找到处方')
  // 调用生成药品订单接口,生成药品订单
  const orderRes = await createMedicalOrder({
    id: prescriptionId as string,
    addressId: address.value?.id as string
  })

  show.value = true
  medicalOrderId.value = orderRes.data.id

  console.log('orderRes', orderRes)
}
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
      return true
    })
}

// 获取收货地址
let address = ref<addressResponseType>()
const initAddress = async () => {
  const addressRes = await getAdderss()
  console.log('addressRes', addressRes.data)
  address.value = addressRes.data[0]
}
initAddress()

// 获取药品信息
const medicineInfo = ref<MedicineResponseType>()
const initMedicineInfo = async () => {
  const medicineInfoRes = await getMedicineInfo({
    prescriptionId: prescriptionId as string
  })

  console.log('medicineInfoRes', medicineInfoRes)
  medicineInfo.value = medicineInfoRes.data
}
initMedicineInfo()
</script>

<template>
  <div class="order-pay-page" v-if="address && medicineInfo">
    <mt-nav-bar title="药品支付"></mt-nav-bar>
    <div class="order-address">
      <p class="area">
        <van-icon name="location"></van-icon>
        <span>{{ address.province }}{{ address.city }}{{ address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>
        {{ address.receiver }} {{ address.mobile?.replace(/^(\d{3})\d+(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>

    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="(item, index) in medicineInfo.medicines" :key="index">
        <img class="img" :src="item.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ item.name }}</span>
            <span>x{{ item.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="item.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ item.specs }}</span>
          </p>
          <p class="price">￥{{ item.amount }}</p>
        </div>
        <div class="desc">用法用量: {{ item.usageDosag }}</div>
      </div>
    </div>

    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${medicineInfo.payment}`"></van-cell>
        <van-cell title="运费" :value="`￥${medicineInfo.expressFee}`"></van-cell>
        <van-cell title="优惠卷" :value="`-￥${medicineInfo.couponDeduction}`"></van-cell>
        <van-cell title="实付款" :value="`￥${medicineInfo.actualPayment}`" class="price"></van-cell>
      </van-cell-group>
    </div>

    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox v-model="agree"> 我已同意 <a href="javascript:;">支付协议</a> </van-checkbox>
    </div>

    <van-submit-bar :loading="loading" button-type="primary" text-align="left" :price="medicineInfo?.actualPayment! * 100"
      button-text="立即支付" @submit="onSubmit" />
  </div>

  <div class="order-pay-page" v-else>
    <mt-nav-bar title="药品支付" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
  </div>

  <mt-pay-sheet payCallback="order/pay/result" :onClose="onClose" :actualPayment="medicineInfo?.actualPayment!"
    v-model:show="show" :orderId="medicalOrderId!"></mt-pay-sheet>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: var(--mt-primary);

  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}

.order-pay-page {
  padding: 46px 0 65px;
}

.order-address {
  padding: 15px 15px 0 15px;
  background-color: #fff;
  font-size: 13px;

  .area {
    color: var(--mt-tag);
    margin-bottom: 5px;

    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }

  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }

  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--mt-bg);
    margin: 0 -15px;
    margin-top: 15px;
  }
}

.order-medical {
  padding: 0 15px;
  background-color: #fff;

  .head {
    display: flex;
    height: 54px;
    align-items: center;

    h3 {
      font-size: 16px;
      font-weight: normal;
    }

    small {
      font-size: 13px;
      color: var(--mt-tag);
      margin-left: 10px;
    }
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;

    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }

    .info {
      padding-left: 15px;
      width: 250px;

      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;

        >span:first-child {
          width: 200px;
        }

        >span:last-child {
          width: 50px;
          text-align: right;
        }
      }

      .size {
        margin-bottom: 5px;

        .van-tag {
          background-color: var(--mt-primary);
          vertical-align: middle;
        }

        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--mt-tag);
          vertical-align: middle;
        }
      }

      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }

    .desc {
      width: 100%;
      background-color: var(--mt-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--mt-tip);
    }
  }
}

.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;

  .tip {
    font-size: 12px;
    color: var(--mt-tag);
    width: 100%;

    &::before {
      content: '*';
      color: var(--mt-price);
      font-size: 14px;
    }

    margin-bottom: 30px;
  }

  .van-checkbox {
    a {
      color: var(--mt-primary);
    }
  }
}

:deep(.van-submit-bar) {
  border-top: 1px solid #eee;
}
</style>
