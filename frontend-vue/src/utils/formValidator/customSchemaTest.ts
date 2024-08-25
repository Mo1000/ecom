import * as yup from 'yup'
import { isFileSizeValid, isImageDimensionsValid } from '../fileUtils'
import { customsValidationMessages, filedWithAtLeast } from './customValidatorMessages'

export const fileSchema = yup
  .mixed()
  .test('file', 'Please select a file', (value) => {
    return value !== undefined && value !== null
  })
  .test('fileSize', 'File size should be less than 2MB', async (value) => {
    return value instanceof File && isFileSizeValid(value)
    // File size is not valid
  })
  .test('imageDimensions', 'Image dimensions should be 430x240', async (value) => {
    if (value instanceof File) {
      return await isImageDimensionsValid(value) // Check image dimensions
    }
    return false // Not an image or failed to load image
  })

export const atLeastOneLinkValidation = (
  value: string | undefined,
  schema: yup.TestContext<yup.AnyObject>
) => {
  const linkValues: string[] = Object.values(schema.parent)
  return linkValues.some((l) => l.length > 0)
}
export const mustBeProperUrl = (value: string | undefined) => {
  if (value?.length === 0) {
    return true
  } else {
    return value?.startsWith('https://')
  }
}

export const requiredString = yup.string().required(customsValidationMessages.required)

export const requiredLinkTest = yup
  .string()
  .required(customsValidationMessages.required)
  .url(customsValidationMessages.url)
  .test('proper_url', customsValidationMessages.mustBeUrl, mustBeProperUrl)
export const optionalLinkTest = yup.string().optional()

export const multiOptionalLinkTest = optionalLinkTest.test(
  'one_link_available',
  customsValidationMessages.atLeastOneLinkAvailable,
  atLeastOneLinkValidation
)

export const optionalString = yup.string().optional().default(undefined)

export const validPassword = requiredString
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .matches(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule')
  .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
  .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Le mot de passe doit contenir au moins un caractère spécial')

export const requiredStringWithMin = (min: number) => {
  return requiredString.min(min, filedWithAtLeast(min))
}
