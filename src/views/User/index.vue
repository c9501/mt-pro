<template>
  <div class="user-page" v-if="user">
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="user.avatar" />
        <div class="name">
          <p>{{ user.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/">全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="user.orderInfo.paidNumber || ''">
            <mt-icons name="user-paid" />
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user.orderInfo.shippedNumber || ''">
            <mt-icons name="user-shipped" /></van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user.orderInfo.receivedNumber || ''">
            <mt-icons name="user-received" /></van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6"><van-badge :content="user.orderInfo.finishedNumber || ''">
            <mt-icons name="user-finished" /></van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-group">
      <h3>快捷⼯具</h3>
      <van-cell :title="item.label" is-link :to="item.path" :border="false" v-for="(item, i) in tools" :key="i">
        <template #icon><mt-icons :name="`user-tool-0${i + 1}`" /></template>
      </van-cell>
    </div>
    <a class="logout" href="javascript:;" @click="logout">退出登录</a>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { getUserInfo } from '@/services/user'
import type { UserInfo } from '@/types/user'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const store = useUserStore()
const router = useRouter()
const logout = async () => {
  showConfirmDialog({
  title: '温馨提示',
  message:
    '您确认要退出优医问诊吗？',
})
  .then(() => {
    store.delUser()
  router.push('/login')
  })
  .catch(() => {
    // on cancel
  });

}
const user = ref<UserInfo>()
//获取数据
onMounted(async () => {
  const res = await getUserInfo()
  user.value = res.data
  // console.log(user.value);

})
const tools = [
  { label: '我的问诊', path: '/user' },
  { label: '我的处⽅', path: '/user' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user' },
  { label: '我的评价', path: '/user' },
  { label: '官⽅客服', path: '/user' },
  { label: '设置', path: '/user' }
]

</script>
<style lang="scss" scoped>
.user-page {
  background-color: var(--mt-bg);
  min-height: calc(100vh - 50px);
  padding: 0 0 65px;
  box-sizing: border-box;
  overflow: auto;


  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;

      .van-image {
        width: 70px;
        height: 70px;
        margin-left: 15px;
      }

      .name {
        padding-left: 10px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }

          &:last-child {
            margin-top: 10px;
            color: var(--mt-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      margin: 0 -15px;
      padding-top: 15px;

      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--mt-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }

  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;

      a {
        color: var(--mt-tip);
      }
    }

    .van-col {
      text-align: center;

      .mt-icon {
        font-size: 28px;
      }

      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }

  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      padding-left: 16px;
      line-height: 44px;
    }

    .van-cell {
      align-items: center;
    }

    .mt-icons {
      font-size: 17px;
      margin-right: 10px;
    }
  }

  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--mt-price);
  }
}
</style>
