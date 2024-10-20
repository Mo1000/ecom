import type { BaseModel } from '@/models/base.model'

export interface CouponModel extends BaseModel {
  code: string
  groupName: string
  discount: number
  status: boolean
  expiredAt: Date
  activeForFullSite: boolean
}
