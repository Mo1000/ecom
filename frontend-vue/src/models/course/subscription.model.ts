import type { BaseModel } from '@/models/base.model'

export interface SubscriptionModel extends BaseModel {
  email: string
  active: boolean
}
