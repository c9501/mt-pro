import { ConsultFlag, IllnessTime } from '@/enums'

export const getIllnessTimeText = (value: string | number): string => {
  const timeOptions = [
    { label: '一周内', value: IllnessTime.Week },
    { label: '一月内', value: IllnessTime.Month },
    { label: '半年内', value: IllnessTime.HalfYear },
    { label: '大于半年', value: IllnessTime.More }
  ]
  const data = timeOptions.find((item) => item.value === value)
  return data?.label as string
}

export const getConsultFlagText = (value: string | number): string => {
  const flagOptions = [
    { label: '就诊过', value: ConsultFlag.isFlag },
    { label: '没就诊过', value: ConsultFlag.noFlag }
  ]

  const data = flagOptions.find((item) => item.value === value)
  return data?.label as string
}
