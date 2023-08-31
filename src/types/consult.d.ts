import { ConsultType, IllnessTime } from "@/enums"
//图片列表
export type Image = {
  id: string   //图片id
  url: string  //图片地址
}

//问诊记录
export type Consult = {
  id: string                 //问诊记录id
  type: ConsultType          //问诊类型
  illnessType: 0 | 1         //快速问诊类型，0普通 1三甲
  depId: string              //科室id
  illnessDesc: string        //疾病描述
  illnessTime: IllnessTime   //疾病持续时间
  consultFlag: 0 | 1         //是否就诊过，0未就诊  1就诊过
  pictures: Image[]          //图片数组
  patientId: string          //患者id
  couponId: string           //优惠卷id
}

//就诊记录--全部可选
export type PartialConsult = Partial<Consult>

// ⽂章类型，关注医⽣的⽂章|推荐的⽂章|减脂|饮⻝
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'
// 通⽤的分⻚查询参数
export type PageParams = {
  // 当前⻚码
  current: number
  // 每⻚条数
  pageSize: number
}
// ⽂章列表查询参数
export type KnowledgeParams = PageParams & {
  // ⽂章类型
  type: KnowledgeType
}
// 医⽣卡⽚对象
export type Doctor = {
  // 医⽣ID
  id: string
  // 医⽣名称
  name: string
  // 头像
  avatar: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 是否关注，0 未关注 1 已关注
  likeFlag: 0 | 1
  // 接诊服务费
  serviceFee: number
  // 接诊⼈数
  consultationNum: number
  // 评分
  score: number
  // 主攻⽅向
  major: string
}
// 医⽣列表
export type DoctorList = Doctor[]
// 医⽣分⻚
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}
// 关注的类型，医⽣|⽂章|百科话题|疾病
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

// 科室
export type SubDep = {
  // 科室ID
  id: string
  // 科室名称
  name: string
}
export type TopDep = SubDep & {
  // ⼆级科室数组
  child: SubDep[]
}

//表单数据
export type ConsultIllness = Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>

