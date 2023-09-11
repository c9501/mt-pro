<script setup lang="ts">
// 1. 下载socket.io的客户端
// 2. 在问诊室页面引入socket.io的客户端文件
// 3. 连接websocket
// 4. 监听服务端推送的消息
// 5. 连接之后,获取到服务端主动的消息, 将消息存储到list
// 6. 主动服务端发送消息
// 7. 接收消息(我们主动接收自己发的消息的以及移医生发送给我们的消息)
// 8. 获取发送的消息之后, 将消息进行渲染
// 9. 下拉刷新时, 主动给后台发送获取聊天记录的请求, 这个时候就会触发获取消息记录的方法

import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { onMounted, ref, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '../../enums'
import { getOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enums'
import dayjs from 'dayjs'
import { closeToast, showLoadingToast, showToast } from 'vant'
const store = useUserStore()
const route = useRoute()
const list = ref<Message[]>([])
let initialMsg = ref(true)
let socket: Socket
onMounted(async () => {
  // 连接websocket
  socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: 'Bearer ' + store.user?.token
    },
    query: {
      orderId: route.query.orderId
    }
  })

  // 监听是否连接成功
  socket.on('connect', () => {
    console.log('连接成功')
  })

  // 监听是否断开链接
  socket.on('disconnect', () => {
    console.log('断开链接')
  })

  // 监听是否连接失败
  socket.on('error', (event) => {
    console.log('连接失败', event)
  })

  // 监听默认的聊天信息
  socket.on('chatMsgList', async ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []

    console.log('e', data)
    data.forEach((item, index) => {
      if (index === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        createTime: item.createTime,
        id: item.createTime,
        msg: { content: item.createTime }
      })
      arr.push(...item.items)
    })
    console.log('arr', arr)
    list.value.unshift(...arr)
    loading.value = false
    closeToast()
    if (!data.length) {
      closeToast()
      return showToast('没有聊天记录了')
    }

    if (initialMsg.value) {
      socket.emit('updateMsgStatus', arr[arr.length - 1].id)
      await nextTick()
      window.scrollTo(0, document.body.scrollHeight)
      initialMsg.value = false
    }
  })

  // 监听订单状态是否改变
  socket.on('statusChange', () => {
    console.log('123')
    initOrderDetail()
  })

  // 接收消息
  socket.on('receiveChatMsg', async (event) => {
    list.value?.push(event)
    // console.log('list', list.value)
    await nextTick()
    // 设置已读
    socket.emit('updateMsgStatus', event.id)
    window.scrollTo(0, document.body.scrollHeight)
  })

  // 建立连接成功
  socket.on('connect', () => {
    list.value = []
  })
})
//获取患者信息
const consult = ref<ConsultOrderItem>()
const initOrderDetail = async () => {
  const orderRes = await getOrderDetail(route.query.orderId as string)
  // console.log('orderRes', orderRes)
  consult.value = orderRes.data
}
initOrderDetail()

// 发送文本
const sendText = async (text: string) => {
  console.log('text', text)
  socket.emit('sendChatMsg', {
    // 发送人
    from: store.user?.id,
    // 接收人
    to: consult.value?.docInfo?.id,
    // 发送消息的类型 文字类型
    msgType: MsgType.MsgText,
    // 消息内容
    msg: {
      content: text
    }
  })
}

// 发送图片
const sendImage = (data: { id: string; url: string }) => {
  // console.log('data', data)
  socket.emit('sendChatMsg', {
    // 发送人
    from: store.user?.id,
    // 接收人
    to: consult.value?.docInfo?.id,
    // 发送消息的类型 图片类型
    msgType: MsgType.MsgImage,
    // 消息内容
    msg: {
      picture: data
    }
  })
}
//加载动画
const loading = ref(false)
//下拉刷新请求的时间
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
//下拉刷新
const onRefresh = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}
</script>

<template>
  <div class="room-page">
    <mt-nav-bar title="医生问诊室"></mt-nav-bar>
    <room-status :status="consult?.status" :countdown="consult?.countdown"></room-status>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message :list="list"></room-message>
    </van-pull-refresh>

    <room-action @send-image="sendImage" @send-text="sendText"
      :disabled="consult?.status === OrderType.ConsultChat ? false : true"></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 24vw;
  padding-bottom: 16vw;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--mt-bg);
}
</style>
