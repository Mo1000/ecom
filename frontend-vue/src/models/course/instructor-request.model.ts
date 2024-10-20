import type { BaseModel } from '@/models/base.model'

export interface InstructorRequest extends BaseModel {
  instructorSubject: string
  instructorDescription: string
  instructorRequest: boolean
  instructorRequestConfirmed: boolean
  instructorRequestConfirmedAt: Date
  instructorStatus: boolean
}
