import type { FormattedResponse } from '@/models/api-response.model'

export function transformeResponseApi<T>(
  success: boolean,
  data: T,
  nameError?: string
): FormattedResponse<T> {
  return {
    nameError,
    success,
    data
  }
}
