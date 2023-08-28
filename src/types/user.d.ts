/* ⽤户信息 */
export type User =
  | {
      id: number | string
      token: string
      account: string
      mobile: number | string
      avatar: string
    }
  | undefined

  /* 验证码 */
export type Code =
{
    code: number | string
  }

