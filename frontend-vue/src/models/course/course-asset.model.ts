import type { BaseModel } from '@/models/base.model'

export interface CourseAssetModel extends BaseModel {
  lectureName: string
  lectureFile: string
  courseId: string
}
