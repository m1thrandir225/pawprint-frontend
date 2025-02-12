import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { Config } from '@/utils/config'

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

export function booleanToText(value: boolean): string {
  return value ? 'Yes' : 'No'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export function constructImageUrl(image: string): string {
  if (image.includes('http')) {
    return image
  }

  return `${Config.uploadFilesURL}${image}`
}
