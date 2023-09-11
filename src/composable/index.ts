import { ref } from 'vue'
import { cancelOrder, deleteOrder, followDoctor } from '@/services/consult'
import type { ConsultOrderItem, FollowType } from '@/types/consult'
// 封装逻辑，规范 useXxx，表示使⽤某功能
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  // {a, b} 类型，传值得时候 {a, b, c} 也可以，这是类型兼容：多的可以给少的
  const follow = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followDoctor(obj.id, type)
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
//查看处方
import { getPrescriptionPic } from '@/services/consult'
import { Toast, showImagePreview, showToast } from 'vant'
import { OrderType } from '@/enums'
import type { OrderDetailResponseType } from '@/types/order'
import { getMedicalOrderDetail } from '@/services/order'
export default function useShowPrescription() {
  const showPrescription = async (id: string | number) => {
    const res = await getPrescriptionPic(id)
    if (res.data.id) {
      showImagePreview([res.data.url])
    }
  }
  return {
    showPrescription
  }
}

// 删除订单
export function useDeleteOrder(cb?: (id: string | number) => void) {
  const deleteLoading = ref(false)
  const handleDeleteOrder = async (item: ConsultOrderItem) => {
    deleteLoading.value = true
    try {
      await deleteOrder(item.id)
      // emits('on-delete', item.id)
      cb && cb(item.id)
      showToast('删除成功')
    } catch (error) {
      showToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }

  return {
    deleteLoading,
    handleDeleteOrder
  }
}



// export const useDeleteOrder = (cb: () => void) => {
//   // 删除订单
//   const loading = ref(false)
//   const deleteConsultOrder = async (item: ConsultOrderItem) => {
//     loading.value = true
//     try {
//       await deleteOrder()
//       // 成功，通知⽗组件删除这条信息，提示，详情就是跳转列表⻚⾯
//       Toast.success('删除成功')
//       cb && cb()
//     } catch (e) {
//       Toast.fail('删除失败')
//     } finally {
//       loading.value = false
//     }
//   }
//   return { loading, deleteConsultOrder }
// }


// 取消订单

// 封装取消订单逻辑
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = (item: ConsultOrderItem) => {
    loading.value = true
    cancelOrder(item.id)
      .then(() => {
        item.status = OrderType.ConsultCancel
        item.statusValue = '已取消'
        showToast('取消成功')
      })
      .catch(() => {
        showToast('取消失败')
      })
      .finally(() => {
        loading.value = false
      })
  }
  return { loading, cancelConsultOrder }
}
// 获取药品订单详情
export function useMedicineOrderDetail(id: string) {
  const item = ref<OrderDetailResponseType>()
  const initMedicineOrderDetail = async () => {
    const OrderDetailRes = await getMedicalOrderDetail(id)
    item.value = OrderDetailRes.data
  }
  initMedicineOrderDetail()
  return { item, initMedicineOrderDetail }
}
