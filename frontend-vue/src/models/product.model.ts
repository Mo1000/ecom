import type { BaseModel } from '@/models/base.model'

interface DumbProductModel {
  title: string
  finalPrice: number
  previousPrice?: number
  image: string
  reductionPercent?: number
  stars: {
    number: number
    total: number
  }
  colorList?: string[]
  sizeList?: string[]

  [key: string]: any
}

export type ProductModel = {} & DumbProductModel & BaseModel

export interface CreateProductModel extends DumbProductModel {}
