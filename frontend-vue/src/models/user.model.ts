import type { AccountRoleEnum } from '@/enums/account-role.enum'

export interface UserModel {
  userName?: string
  password: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  roles?: AccountRoleEnum[]
  phone: string
}
