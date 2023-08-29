/* ⽤户信息 */
export type User =
   {
    id: number | string
    token: string
    account: string
    mobile: number | string
    avatar: string
  }

/* 验证码 */
export type Code =
  {
    code: number | string
  }
// 个⼈信息
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// type Info = {
//   likeNumber: number
//   collectionNumber: number
//   score: number
//   couponNumber: number
//   orderInfo: {
//     paidNumber: number
//     receivedNumber: number
//     shippedNumber: number
//     finishedNumber: number
//   }
// }
// export type UserInfo = Info & UserInfo

// 家庭档案-患者信息
export type Patient = {
  // 患者ID
  id: string
  // 患者名称
  name: string
  // 身份证号
  idCard: string
  // 0不默认 1默认
  defaultFlag: 0 | 1
  // 0 ⼥ 1 男
  gender: 0 | 1
  // 性别⽂字
  genderValue: string
  // 年龄
  age: number
}
// 家庭档案-患者信息列表
export type PatientList = Patient[]
