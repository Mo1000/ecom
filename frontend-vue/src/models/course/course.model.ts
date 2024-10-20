import type { BaseModel } from '@/models/base.model'
import { AccessTimeEnum } from '@/enums/access-time.enum'

export interface CourseModel extends BaseModel {
  title: string
  slug: string
  shortDesc: string
  overview: string
  latestPrice: number
  beforePrice: number
  lessons: string
  duration: string
  image: string
  accessTime: AccessTimeEnum
  requirements: string
  whatYouWillLearn: string
  whoIsThisCourseFor: string
  userId: string
  catId: string
  approved: boolean
  inHomePage: boolean
  inHomePageSetAt: Date
  isClass: boolean
}

export interface CreateCourseModel extends Omit<CourseModel, 'userId'> {}
