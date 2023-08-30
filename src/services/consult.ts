import type { KnowledgePage, KnowledgeParams } from "@/types/home-knowledge-type"
import type { DoctorPage, PageParams ,FollowType} from '@/types/consult'
import request from "@/utils/request";
//首页推荐数据
export const getKnowledgePage = (params: KnowledgeParams) =>
request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
//获取关注医生
export const getDoctorPage = (params: PageParams) =>
request<DoctorPage>('/home/page/doc', 'GET', params)
//关注和取消关注
export const followDoctor = (id: string, type: FollowType = 'doc') =>
request('/like', 'POST', { id, type })


