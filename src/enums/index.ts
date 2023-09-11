// //问诊类型
// export enum ConsultType {
//   Doctor = 1,        //找医生
//   Fast = 2,          //k快速问诊
//   Medication = 3,    //开药问诊
// }
// //问诊时间
// export enum IllnessTime{
//   Week = 1,     //一周内
//   Month,        //一月内
//   HalfYear,     //半年内
//   More          //半年以上
// }

// export enum ConsultFlag {
//   isFlag = 1,
//   noFlag = 0
// }

// /**
//  * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
//  */
// export enum Status {
//   The1 = '1',
//   The2 = '2',
//   The3 = '3',
//   The4 = '4',
//   The5 = '5'
// }

// // 订单状态
// export enum OrderType {
//   // 问诊订单
//   /** 待支付 */
//   ConsultPay = 1,
//   /** 待接诊 */
//   ConsultWait = 2,
//   /** 问诊中 */
//   ConsultChat = 3,
//   /** 问诊完成 */
//   ConsultComplete = 4,
//   /** 取消问诊 */
//   ConsultCancel = 5,
//   // 药品订单
//   /** 待支付 */
//   MedicinePay = 10,
//   /** 待发货 */
//   MedicineSend = 11,
//   /** 待收货 */
//   MedicineTake = 12,
//   /** 已完成 */
//   MedicineComplete = 13,
//   /** 取消订单 */
//   MedicineCancel = 14
// }

// 问诊类型
export enum ConsultType {
  // 找医生
  Doctor = 1,
  // 快速问诊
  Fast = 2,
  // 开药问诊
  Medication = 3
}

// 极速问诊类型
export enum IllnessType {
  // 普通问诊
  Normal = 0,
  // 三甲问诊
  Trimethylate = 1
}

// 问诊时间，以1自增可以省略
export enum IllnessTime {
  // 一周内
  Week = 1,
  // 一月内
  Month,
  // 半年内
  HalfYear,
  // 半年以上
  More
}

export enum ConsultFlag {
  isFlag = 1,
  noFlag = 0
}

/**
 * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
 */
export enum Status {
  The1 = '1',
  The2 = '2',
  The3 = '3',
  The4 = '4',
  The5 = '5'
}

// 订单状态
export enum OrderType {
  // 问诊订单
  /** 待支付 */
  ConsultPay = 1,
  /** 待接诊 */
  ConsultWait = 2,
  /** 问诊中 */
  ConsultChat = 3,
  /** 问诊完成 */
  ConsultComplete = 4,
  /** 取消问诊 */
  ConsultCancel = 5,
  // 药品订单
  /** 待支付 */
  MedicinePay = 10,
  /** 待发货 */
  MedicineSend = 11,
  /** 待收货 */
  MedicineTake = 12,
  /** 已完成 */
  MedicineComplete = 13,
  /** 取消订单 */
  MedicineCancel = 14
}

// 消息类型
export enum MsgType {
  /** 文字聊天 */
  MsgText = 1,
  /** 图片聊天 */
  MsgImage = 4,
  /** 患者信息 */
  CardPat = 21,
  /** 处方信息 */
  CardPre = 22,
  /** 未评价信息 */
  CardEvaForm = 23,
  /** 已评价信息 */
  CardEva = 24,
  /** 通用通知 */
  Notify = 31,
  /** 温馨提示 */
  NotifyTip = 32,
  /** 取消提示 */
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  /** 未付款 */
  NotPayment = 1,
  /** 已付款 */
  Payment = 2,
  /** 已失效 */
  Invalid = 3
}
