import { getCookieValue } from '@/utils/storage/manageCookies'
import ky, { type Options } from 'ky'
import { USER_JWT_TOKEN_COOKIE_NAME } from '@/constants'
import type { FormattedResponse, ResponseSuccessApiModel } from '@/models/api-response.model'
import { transformeResponseApi } from '@/utils/transformeResponseApi'
import type { ResponseErrorAPi } from '@/models/handleErrorApi/error-api.model'

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL

/* eslint-disable  @typescript-eslint/no-explicit-any */
function getCustomFetch() {
  return ky.extend({
    prefixUrl: API_BASE_URL,
    timeout: 60000,
    hooks: {
      beforeRequest: [
        (request) => {
          const token = getCookieValue(USER_JWT_TOKEN_COOKIE_NAME)
          if (token) request.headers.set('Authorization', `Bearer ${token}`)
        }
      ]
    }
  })
}

const kyInstanceClient = getCustomFetch()

export async function get<T>(path: string, config?: Options): Promise<FormattedResponse<T>> {
  try {
    const res: ResponseSuccessApiModel<T> = await kyInstanceClient.get(path, config).json()
    return transformeResponseApi<T>(true, res.data)
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      throw transformeResponseApi<ResponseErrorAPi>(false, await error.response.json(), error.name)
    }
    throw transformeResponseApi<any>(false, error)
  }
}

export async function post<T>(
  path: string,
  body: any,
  config?: Options
): Promise<FormattedResponse<T>> {
  try {
    const res: ResponseSuccessApiModel<T> = await kyInstanceClient
      .post(path, {
        json: body,
        ...config
      })
      .json()
    return transformeResponseApi<T>(true, res.data)
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      throw transformeResponseApi<ResponseErrorAPi>(false, await error.response.json(), error.name)
    }
    throw transformeResponseApi<any>(false, error)
  }
}

export async function remove<T>(
  path: string,
  body?: any,
  config?: Options
): Promise<FormattedResponse<T>> {
  try {
    const res: ResponseSuccessApiModel<T> = await kyInstanceClient
      .delete(path, {
        json: body,
        ...config
      })
      .json()
    return transformeResponseApi<T>(true, res.data)
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      throw transformeResponseApi<ResponseErrorAPi>(false, await error.response.json(), error.name)
    }
    throw transformeResponseApi<any>(false, error)
  }
}

export async function patch<T>(
  path: string,
  body: any,
  config?: Options
): Promise<FormattedResponse<T>> {
  try {
    const res: ResponseSuccessApiModel<T> = await kyInstanceClient
      .patch(path, {
        json: body,
        ...config
      })
      .json()
    return transformeResponseApi<T>(true, res.data)
  } catch (error: any) {
    if (error?.name === 'HTTPError') {
      throw transformeResponseApi<ResponseErrorAPi>(false, await error.response.json(), error.name)
    }
    throw transformeResponseApi<any>(false, error)
  }
}
