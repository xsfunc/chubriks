import { combine, createEvent, createStore, sample } from 'effector'
import type { FaceElement, UpdateParams } from './types'
import { updateFaceElement } from './lib'

const eyesUpdated = createEvent<UpdateParams>()
const noseUpdated = createEvent<UpdateParams>()
const mouthUpdated = createEvent<UpdateParams>()

const $eyes = createStore<FaceElement>({ size: 1, variant: 1, y: 1 })
const $nose = createStore<FaceElement>({ size: 1, variant: 1, y: 1 })
const $mouth = createStore<FaceElement>({ size: 1, variant: 1, y: 1 })
const $face = combine(
  $eyes, $nose, $mouth,
  (eyes, nose, mouth) => ({ eyes, nose, mouth }),
)

sample({
  clock: eyesUpdated,
  source: $eyes,
  fn: updateFaceElement,
  target: $eyes,
})
sample({
  clock: noseUpdated,
  source: $nose,
  fn: updateFaceElement,
  target: $nose,
})
sample({
  clock: mouthUpdated,
  source: $mouth,
  fn: updateFaceElement,
  target: $mouth,
})

export const faceModel = {
  face: $face,
  eyes: $eyes,
  nose: $nose,
  mouth: $mouth,
  updateEyes: eyesUpdated,
  updateNose: noseUpdated,
  updateMouth: mouthUpdated,
}
