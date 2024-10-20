import type { BaseModel } from '@/models/base.model'

export interface CategoryModel extends BaseModel {
  name: string
  slug: string
}
