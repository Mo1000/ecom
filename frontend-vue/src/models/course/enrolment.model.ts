import type { BaseModel } from '@/models/base.model'

export interface EnrolmentModel extends BaseModel {
  boughtPrice: number
  paymentMethod: string
  buyerName: string
  buyerEmail: string
  buyerAvatar: string
  userId: string
  courseId: string
  status: 'paid' | 'unpaid'
}
