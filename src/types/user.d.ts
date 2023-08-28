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
