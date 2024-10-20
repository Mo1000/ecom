import type { BaseModel } from '@/models/base.model'

export interface FavouriteModel extends BaseModel {
  userId: string
  courseId: string
}
