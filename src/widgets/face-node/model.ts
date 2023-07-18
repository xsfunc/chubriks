import { createEffect, createEvent, createStore, sample } from 'effector'

const addFaceFx = createEffect(({ faces, face }) => {
  const id = 1
  return { ...faces, [id]: face }
})

const faceAdded = createEvent()
const $faces = createStore({
  1: {},
})

sample({
  clock: faceAdded,
  source: $faces,
  fn: (faces, face) => ({ faces, face }),
  target: addFaceFx,
})
sample({
  clock: addFaceFx.doneData,
  target: $faces,
})
