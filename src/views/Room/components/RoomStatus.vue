<template>
  <div class="room-status">
<!-- 根据父组件传过来的状态进行相对应的显示 -->
    <div class="wait" v-if="status === OrderType.ConsultWait">
      已通知医生尽快接诊，24小时内医生未回复将自动退款
    </div>
    <div class="chat" v-if="status === OrderType.ConsultChat">
      <span>咨询中</span>
      <span>剩余时间： <van-count-down :time="countdown! * 1000" /></span>
    </div>
    <div class="end" v-if="status === OrderType.ConsultComplete || status === OrderType.ConsultCancel" >
      <van-icon name="passed" /> 已结束
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderType } from '@/enums';
const { status, countdown } = defineProps<{
  status?: OrderType
  countdown?: number
}>()
</script>
<style lang="scss" scoped>
.room-status {
  position: fixed;
  left: 0;
  top: 46px;
  height: 44px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;
  line-height: 44px;

  .wait {
    padding: 0 15px;
    background-color: var(--mt-plain);
    height: 100%;
    text-align: center;
    color: var(--mt-primary);
  }

  .chat {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    span {
      &:first-child {
        color: var(--mt-primary);
      }

      &:last-child {
        color: var(--mt-text2);
        width: 130px;

        .van-count-down {
          display: inline;
        }
      }
    }
  }

  .end {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    font-weight: 500;

    .van-icon {
      font-size: 14px;
      margin-right: 4px;
      position: relative;
      top: 1px;
    }
  }
}
</style>
