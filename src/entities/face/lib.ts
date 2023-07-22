export const faceDataDefault = {
  sourceHandles: {
    eyes: {
      type: 'eyes',
    },
  },
}

export function updateFaceElement<T extends object>(element: T, payload: Partial<T>): T {
  return { ...element, ...payload }
}
