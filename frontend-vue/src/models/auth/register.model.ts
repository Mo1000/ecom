import type { UserModel } from '@/models/user/user.model'
import type { BaseModel } from '@/models/base.model'

export interface RegisterModel
  extends Omit<
    UserModel,
    | 'roles'
    | 'avatar'
    | 'resetPasswordToken'
    | 'resetPasswordSendAt'
    | 'resetPasswordAt'
    | 'emailConfirmed'
    | keyof BaseModel
  > {}
