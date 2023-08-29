//request类型限制
export type Data<T> = {
  code: number
  message: string
  data: T
}
