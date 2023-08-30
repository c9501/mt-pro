// ⽂章信息类型
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}
// ⽂章列表
export type KnowledgeList = Knowledge[]
// ⽂章列表带分⻚
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}
// ⽂章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
