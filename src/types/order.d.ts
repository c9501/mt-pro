// 获取药品支付页面参数类型
export type MedicineType = {
  /**
   * 使用优惠券，需要传此值，不使用优惠券，不传
   */
  couponId?: string
  /**
   * 处方id
   */
  prescriptionId: string
  /**
   * 不传，默认值1，即使用优惠券
   * 传0，不使用优惠券
   * 其中，不传优惠券id,默认按照最大优惠券使用，
   * 传了优惠券id,表示使用指定的优惠券
   */
  useCoupon?: string
}

export type MedicineResponseType = {
  /**
   * 实际支付
   */
  actualPayment: number
  /**
   * 优惠券抵扣
   */
  couponDeduction: number
  /**
   * 使用的优惠券id
   */
  couponId: string
  /**
   * 运费
   */
  expressFee: number
  /**
   * 处方id
   */
  id: string
  /**
   * 药品信息
   */
  medicines: Medicine[]
  /**
   * 应付金额(药品总价格)
   */
  payment: number
  /**
   * 积分可抵扣
   */
  pointDeduction: number
}

// 药品信息
export type Medicine = {
  /**
   * 药品价格
   */
  amount: string
  /**
   * 药品图片
   */
  avatar: string
  /**
   * 主键id
   */
  id: string
  /**
   * 药品名称
   */
  name: string
  /**
   * 是否是处方药0不是1是
   */
  prescriptionFlag: number
  /**
   * 选择的药品数量
   */
  quantity: number
  /**
   * 药品规格
   */
  specs: string
  /**
   * 药品用法用量
   */
  usageDosag: string
}

// 定义收货地址类型
export type addressResponseType = {
  /**
   * 详细地址
   */
  addressDetail: string
  /**
   * 市区
   */
  city: string
  /**
   * 县
   */
  county: string
  /**
   * 收货地址id
   */
  id: string
  /**
   * 是否为默认，1为是，0为否
   */
  isDefault?: number
  /**
   * 联系方式
   */
  mobile?: string
  /**
   * 省份
   */
  province: string
  /**
   * 收货人姓名
   */
  receiver?: string
}

// 下单的参数类型
export type MedicineOrderType = {
  /**
   * 地址信息
   */
  addressId: string
  /**
   * 使用优惠券信息，不使用优惠券，不用传值
   */
  couponId?: string
  /**
   * 处方id
   */
  id: string
}

// 药品订单详情返回的数据类型

export type OrderDetailResponseType = {
  /**
   * 实际付款金额
   */
  actualPayment: number
  /**
   * 地址信息
   */
  addressInfo: AddressInfo
  /**
   * 取消/退款进度
   */
  cancelProcess?: string
  /**
   * 取消订单原因
   */
  cancelReason?: string
  /**
   * 取消订单原因文字
   */
  cancelReasonValue?: string
  /**
   * 待支付返回的倒计时-1表示已经结束，单位s
   */
  countdown?: number
  /**
   * 优惠券抵扣金额
   */
  couponDeduction: number
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 运费
   */
  expressFee: number
  /**
   * 物流信息信息--最新的物流信息
   */
  expressInfo?: ExpressInfo
  /**
   * 订单id
   */
  id: string
  /**
   * 处方的药品列表信息
   */
  medicines?: Medicine[]
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 应付款（药品总金额）
   */
  payment: string
  /**
   * 支付方式0微信支付，1支付宝
   */
  paymentMethod: number
  /**
   * 支付时间
   */
  payTime: string
  /**
   * 处方id信息
   */
  prescriptionId?: string
  /**
   * 药品订单对应处方的聊天室id
   */
  roomId: string
  /**
   * 药品订单状态10待支付11待发货12待收货13已完成14已取消
   */
  status: number
  /**
   * 药品订单状态10待支付11待发货12待收货13已完成14已取消
   */
  statusValue: string
  /**
   * 订单类型1问医生2极速问诊3开药问诊4、药品订单
   */
  type?: number
}

/**
 * 地址信息
 */
export type AddressInfo = {
  /**
   * 具体地址
   */
  addressDetail: string
  /**
   * 市区信息
   */
  city: string
  /**
   * 区县信息
   */
  county: string
  /**
   * 地址id
   */
  id: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 省份
   */
  province: string
  /**
   * 收件人
   */
  receiver: string
}

/**
 * 物流信息信息--最新的物流信息
 */
export type ExpressInfo = {
  /**
   * 物流信息内容
   */
  content: string
  /**
   * 物流信息内容
   */
  time: string
}

// 物流信息返回的类型
export type ExpressResponseType = {
  /**
   * 快递单号
   */
  awbNo: string
  currentLocationInfo: CurrentLocationInfo
  /**
   * 预计送达时间
   */
  estimatedTime: string
  /**
   * 物流日志
   */
  list: List[]
  /**
   * 物流运输轨迹经纬度
   */
  logisticsInfo: LogisticsInfo[]
  /**
   * 公司名称
   */
  name: number
  /**
   * 订单派送状态1已发货 2已揽件 3 运输中 4 派送中 5已签收
   */
  status: string
  /**
   * 订单状态值
   */
  statusValue: string
}

export type CurrentLocationInfo = {
  /**
   * 纬度信息
   */
  latitude: string
  /**
   * 经度信息
   */
  longitude: string
}

export type List = {
  /**
   * 信息文字
   */
  content: string
  /**
   * 时间
   */
  createTime: string
  /**
   * 物流详情信息ID
   */
  id: string
  /**
   * 状态code
   */
  status: string
  /**
   * 状态值
   */
  statusValue: string
}

export type LogisticsInfo = {
  /**
   * 纬度信息
   */
  latitude: string
  /**
   * 经度信息
   */
  longitude: string
}
