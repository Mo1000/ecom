import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import type { CourseModel } from '@/models/course/course.model'

export const useCourseStore = defineStore('product', () => {
  const courseList = ref<CourseModel[]>([])
  const totalCourses = ref(0)

  // Define overloads for the setProductList function
  function setCoursesList(newProducts: CourseModel[]): void
  function setCoursesList(callback: (prev: CourseModel[]) => CourseModel[]): void

  // Implement the function
  function setCoursesList(arg: CourseModel[] | ((prev: CourseModel[]) => CourseModel[])) {
    if (typeof arg === 'function') {
      // If a callback is provided, use it with the current value of productsList
      courseList.value = arg(courseList.value)
    } else {
      // If a new product list is provided directly, set it
      courseList.value = arg
    }
  }

  const setTotalCourses = (total: number) => {
    totalCourses.value = total
  }

  return {
    courseList: readonly(courseList),
    totalCourses: readonly(totalCourses),
    setCoursesList,
    setTotalCourses
  }
})
