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
