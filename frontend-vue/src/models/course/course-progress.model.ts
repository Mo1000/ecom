import type { BaseModel } from '@/models/base.model'

export interface CourseProgressModel extends BaseModel {
  finished: boolean
  userId: string
  courseId: string
  videoId: string
}
