type FileTypes = File | Blob

type WithFiles<T extends Record<string, unknown>> = {
  [P in keyof T]:
    | T[P]
    | FileTypes
    | FileTypes[]
    | (T[P] extends (infer U)[] ? (U | FileTypes)[] : T[P])
}

export const buildFormData = <T extends Record<string, unknown>>(data: WithFiles<T>): FormData => {
  const formData = new FormData()

  const appendValue = (key: string, value: unknown) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value))
    }
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return
    }

    if (Array.isArray(value)) {
      // Handle arrays of files/blobs
      if (value.length > 0 && (value[0] instanceof File || value[0] instanceof Blob)) {
        value.forEach((file) => {
          if (file instanceof File || file instanceof Blob) {
            formData.append(key, file)
          }
        })
      }
      // Handle arrays of objects
      else if (
        value.length > 0 &&
        typeof value[0] === 'object' &&
        !(value[0] instanceof File) &&
        !(value[0] instanceof Blob)
      ) {
        value.forEach((item, index) => {
          if (item && typeof item === 'object') {
            Object.entries(item).forEach(([itemKey, itemValue]) => {
              if (itemValue !== null && itemValue !== undefined) {
                formData.append(`${key}[${index}][${itemKey}]`, String(itemValue))
              }
            })
          }
        })
      }
      // Handle arrays of primitives
      else {
        value.forEach((item, index) => {
          if (item !== null && item !== undefined) {
            formData.append(`${key}[${index}]`, String(item))
          }
        })
      }
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)
    } else if (typeof value === 'object') {
      // Handle single objects
      Object.entries(value).forEach(([objKey, objValue]) => {
        if (objValue !== null && objValue !== undefined) {
          formData.append(`${key}[${objKey}]`, String(objValue))
        }
      })
    } else {
      appendValue(key, value)
    }
  })

  return formData
}
