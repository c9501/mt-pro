import type { KnowledgePage, KnowledgeParams } from "@/types/home-knowledge-type"
import type { DoctorPage, PageParams, FollowType, Image, TopDep, ConsultOrderPreParams, ConsultOrderPreData, PartialConsult, ConsultOrderPage, ConsultOrderListParams, ConsultOrderItem } from '@/types/consult'
import request from "@/utils/request";
//首页推荐数据
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
//获取关注医生
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
//关注和取消关注
export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
//科室
export const getAllDep = () => request<TopDep[]>('/dep/all')
//上传图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}

// 拉取预⽀付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

//生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)
//生成支付地址
export const getConsultOrderUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

//获取问诊记录信息
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)


  // 取消订单
export const cancelOrder = (id: string | number) => {
  return request(`/patient/order/cancel/${id}`, 'PUT')
}

// 删除订单
export const deleteOrder = (id: string | number) => {
  return request(`/patient/order/${id}`, 'DELETE')
}

// 查看处方
export const getPrescriptionPic = (id: string | number) => {
  return request<{ id: string; url: string }>(`patient/consult/prescription/${id}`, 'GET')
}

// 查看订单详情
export const getOrderDetail = (orderId: string) => {
  return request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
}
