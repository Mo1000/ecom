import Parse from '@/utils/parse/index'
import type { CourseModel, CreateCourseModel } from '@/models/course/course.model'
import type { ParseCourseModel } from '@/models/parse/parse-course.model'

class CourseService extends Parse.Object {
  static parseClassName = 'Product'

  constructor() {
    // Pass the ClassName to the Parse.Object constructor
    super(CourseService.parseClassName)
  }

  static async createCourse(course: CreateCourseModel) {
    return Parse.Cloud.run('createCourse', course)
  }

  static async getCourses() {
    const query = new Parse.Query(CourseService)
    return (await query.find()) as unknown as CourseModel[]
  }

  static async getProductById(objectId: string) {
    const query = new Parse.Query(CourseService)
    return (await query.get(objectId)) as unknown as ParseCourseModel
  }

  static createManyProducts(products: CreateCourseModel[]) {
    const parseProduct = products.map((product) => {
      const prod = new CourseService()
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
    const query = new Parse.Query(CourseService)
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
    query.withCount()
    const res = (await query.find({ json: true })) as unknown as {
      results: CourseModel[]
      count: number
    }
    return {
      products: res.results,
      total: res.count
    }
  }

  static async deleteProduct(objectId: string) {
    return Parse.Cloud.run('deleteProduct', { objectId })
  }

  static async updateProduct(objectId: string, product: CourseModel) {
    return Parse.Cloud.run('updateProduct', { objectId, product })
  }

  static get() {
    return new Parse.Query(CourseService)
  }
}

export default CourseService
