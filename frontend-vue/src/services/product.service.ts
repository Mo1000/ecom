import Parse from '@/utils/parse/index'
import type { CreateProductModel, ProductModel } from '@/models/product.model'

class ProductService extends Parse.Object {
  static parseClassName = 'Product'
  // title: string = ''
  // finalPrice: number = 0
  // previousPrice?: number
  // image: string = ''
  // reductionPercent?: number
  // stars?: {
  //     number: number
  //     total: number
  // } = {number: 0, total: 0}
  // colorList?: string[]
  // sizeList?: string[]

  constructor() {
    // Pass the ClassName to the Parse.Object constructor
    super(ProductService.parseClassName)
  }

  static async createProduct(product: ProductModel) {
    const prod = new ProductService()
    Object.entries(product).forEach(([key, value]) => {
      prod.set(key, value)
    })
    const res = await prod.save()
    return res.toJSON()
  }

  static async getProducts() {
    const query = new Parse.Query(ProductService)
    return (await query.find({ json: true })) as unknown as ProductModel[]
  }

  static async getProductById(objectId: string) {
    const query = new Parse.Query(ProductService)
    return (await query.get(objectId, { json: true })) as unknown as ProductModel
  }

  static createManyProducts(products: CreateProductModel[]) {
    const parseProduct = products.map((product) => {
      const prod = new ProductService()
      Object.entries(product).forEach(([key, value]) => {
        prod.set(key, value)
      })
      return prod
    })
    return Parse.Object.saveAll(parseProduct)
  }

  static async getProductsByAny(
    pagination?: {
      limit?: number
      skip?: number
    },
    filters?: {
      sections: string[]
      title?: string
      colorList?: string[]
      sizeList?: string[]
    }
  ) {
    const query = new Parse.Query(ProductService)
    if (filters) {
      if (filters.sections) query.containedIn('sections', filters.sections)
      if (filters.title) query.matches('title', new RegExp(filters.title), 'i')
      if (filters.colorList) query.containedIn('colorList', filters.colorList)
      if (filters.sizeList) query.containedIn('sizeList', filters.sizeList)
    }
    if (pagination) {
      if (pagination.limit) query.limit(pagination.limit)
      if (pagination.skip) query.skip(pagination.skip)
    }
    return {
      products: (await query.find({ json: true })) as ProductService[],
      total: await query.count()
    }
  }

  static async deleteProduct(objectId: string) {
    return Parse.Cloud.run('deleteProduct', { objectId })
  }

  static async updateProduct(objectId: string, product: ProductModel) {
    return Parse.Cloud.run('updateProduct', { objectId, product })
  }

  static get() {
    return new Parse.Query(ProductService)
  }
}

export default ProductService
