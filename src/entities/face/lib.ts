import type { FaceElement } from './types'

export const faceDataDefault = {
  sourceHandles: {
    eyes: {
      type: 'eyes',
    },
  },
}

export function updateFaceElement<T extends FaceElement>(element: T, payload: Partial<T>): T {
  return { ...element, ...payload }
}
