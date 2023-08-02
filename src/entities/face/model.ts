import { combine, createEvent, createStore, sample } from 'effector'
import type { UpdateEyesParams, UpdateParams } from './types'
import { updateFaceElement } from './lib'
import type { EyesProps, MouthProps, NoseProps } from '@/shared/lib'

const eyesUpdated = createEvent<UpdateEyesParams>()
const noseUpdated = createEvent<UpdateParams>()
const mouthUpdated = createEvent<UpdateParams>()

const $eyes = createStore<EyesProps>({ size: 5, variant: 1, y: 1, mirror: false })
const $nose = createStore<NoseProps>({ size: 5, variant: 1, y: 1 })
const $mouth = createStore<MouthProps>({ size: 5, variant: 1, y: 1 })
const $face = combine(
  $eyes, $nose, $mouth,
  (eyes, nose, mouth) => ({ eyes, nose, mouth }),
)

sample({
  clock: eyesUpdated,
  source: $eyes,
  fn: updateFaceElement<EyesProps>,
  target: $eyes,
})
sample({
  clock: noseUpdated,
  source: $nose,
  fn: updateFaceElement<NoseProps>,
  target: $nose,
})
sample({
  clock: mouthUpdated,
  source: $mouth,
  fn: updateFaceElement<MouthProps>,
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
