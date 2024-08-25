import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen'
import { isValidNumber } from 'libphonenumber-js'

export const cloudinaryInstance = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_PUBLIC_CLOUDINARY_API_SECRET
  },
  url: {
    secure: true
  }
})

export const optimizeUrl = (image: string): CloudinaryImage => {
  return cloudinaryInstance.image(image.split('upload/')[1]).quality('auto').format('webp')
}

export const validatePhoneNumber = (value: string) => {
  // To be reviewed, since what it is asking is not number, why use it that way? Is there a reason?
  // We should find another way later
  // @ts-ignore
  if (value && value?.startsWith('+229')) return isValidNumber(value)
  return isValidNumber('+229' + value)
}
