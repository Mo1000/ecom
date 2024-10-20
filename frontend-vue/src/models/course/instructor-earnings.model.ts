import type { BaseModel } from '@/models/base.model'

export interface InstructorEarningsModel extends BaseModel {
  earnings: number
  userId: string
  courseId: string
  status: 'due' | 'paid' | 'cancelled'
}
