export function convertMegabytesToBytes(megabytes: number) {
  return megabytes * 1024 * 1024
}

export function convertBytesToMegaBytes(bytes: number) {
  return bytes / (1024 * 1024)
}

export const getFileExtension = (fileName: string) => {
  const extIndex = fileName.lastIndexOf('.')
  if (extIndex !== -1) {
    const ext = fileName.slice(extIndex)
    return ext
  }
  return ''
}

// Function to check file size in MB
export const isFileSizeValid = (file: File) => {
  const fileSizeInMB = file.size / (1024 * 1024) // Convert bytes to MB
  const maxFileSize = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 2
  return fileSizeInMB <= maxFileSize // Check if file size is less than or equal to 2MB
}

// Function to check image dimensions (width and height)
export const isImageDimensionsValid = async (file: File) => {
  return new Promise<boolean>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      if (img.width === 430 && img.height === 240) {
        resolve(true) // Image dimensions are valid
      } else {
        resolve(false) // Image dimensions are not valid
      }
    }
    img.onerror = () => {
      reject(new Error('Failed to load image')) // Error occurred while loading image
    }
    img.src = URL.createObjectURL(file)
  })
}
