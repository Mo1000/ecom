import type { UserModel } from '@/models/user.model'

export interface RegisterModel extends Omit<UserModel, 'roles'> {}
