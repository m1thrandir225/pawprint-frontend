import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop()
    if (fileType === 'docx' || fileType === 'pdf') return true
  }
  return false
}
