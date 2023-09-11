<script setup lang="ts">
import { useMedicineOrderDetail } from '@/composable'
import { useRoute } from 'vue-router'
import OrderMedical from './components/OrderMedical.vue'
import { OrderType } from '@/enums'
const route = useRoute()
const { item } = useMedicineOrderDetail(route.params.id as string)
// console.log(item)
</script>

<template>
  <div class="order-pay-page" v-if="item">
    <mt-nav-bar title="药品订单详情"></mt-nav-bar>
    <div class="head">
      <div class="card" @click="$router.push(`/order/logistics/${item.id}`)">
        <div class="logistics">
          <p>{{ item?.expressInfo?.content }}</p>
          <p>{{ item?.expressInfo?.time }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>

    <OrderMedical :medicineInfo="item"></OrderMedical>

    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${item.payment}`" />
        <van-cell title="运费" :value="`￥${item.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${item.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${item.actualPayment}`" />
        <van-cell title="订单编号" :value="item.orderNo" />
        <van-cell title="创建时间" :value="item.createTime" />
        <template
          v-if="
            item.status === OrderType.MedicineSend ||
            item.status === OrderType.MedicineTake ||
            item.status === OrderType.MedicineComplete
          "
        >
          <van-cell title="支付时间" :value="item.payTime" />
          <van-cell title="支付方式" :value="item.paymentMethod === 0 ? '微信' : '支付宝'" />
        </template>
      </van-cell-group>
    </div>

    <!-- 已取消 -->
    <van-action-bar v-if="item.status === OrderType.MedicineCancel">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="沟通记录" />
    </van-action-bar>
    <!-- 待收货 -->
    <van-action-bar v-if="item.status === OrderType.MedicineTake">
      <van-action-bar-button type="primary" text="确认收货" />
    </van-action-bar>
    <!-- 待发货 -->
    <van-action-bar v-if="item.status === OrderType.MedicineSend">
      <van-action-bar-button type="primary" text="提醒发货" />
    </van-action-bar>
    <!-- 待支付 -->
    <van-action-bar v-if="item.status === OrderType.MedicinePay">
      <p class="price">
        需要支付：<span>￥ {{ item.actualPayment }}</span>
      </p>
      <van-action-bar-button color="#bbb" text="取消问诊" />
      <van-action-bar-button type="primary" text="继续支付" />
    </van-action-bar>
    <!-- 已完成 -->
    <van-action-bar v-if="item.status === OrderType.MedicineComplete">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="再次购买" />
    </van-action-bar>
  </div>

  <!-- <div class="order-pay-page" v-else>
    <mt-nav-bar title="药品支付" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
  </div> -->
</template>

<style lang="scss" scoped>
.order-pay-page {
  padding: 46px 0 65px;
}
.head {
  position: relative;
  padding: 15px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }

  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
  }

  .logistics {
    flex: 1;
    p {
      &:first-child {
        color: var(--mt-primary);
      }
      &:last-child {
        color: var(--mt-tag);
        font-size: 13px;
        margin-top: 5px;
      }
    }
  }
  .van-icon {
    color: var(--mt-tip);
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
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
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
