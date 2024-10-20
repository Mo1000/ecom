import * as yup from 'yup'
import { customsValidationMessages } from '@/utils/formValidator/customValidatorMessages'
import { validatePhoneNumber } from '@/utils'
import { requiredString, validPassword } from './customSchemaTest'

export const registerSchemaForm = yup.object({
  email: yup
    .string()
    .email(customsValidationMessages.mustBeEmail)
    .required(customsValidationMessages.required),
  firstName: requiredString,
  lastName: requiredString,
  userName: requiredString,
  phone: yup
    .string()
    .required(customsValidationMessages.required)
    .test('is-valid-phone', customsValidationMessages.invalidPhoneNumber, (value) => {
      return validatePhoneNumber(value)
    }),
  avatar: yup.string().optional(),
  password: validPassword
})

export const loginSchemaForm = yup.object({
  email: yup
    .string()
    .email(customsValidationMessages.mustBeEmail)
    .required(customsValidationMessages.required),
  password: yup.string().required(customsValidationMessages.required)
})
