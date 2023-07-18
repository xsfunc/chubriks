import { combine, createEvent, createStore, sample } from 'effector'

const eyesUpdated = createEvent<object>()
const noseUpdated = createEvent<object>()
const mouthUpdated = createEvent<object>()

const $eyes = createStore({})
const $nose = createStore({})
const $mouth = createStore({})
const $face = combine(
  $eyes, $nose, $mouth,
  (eyes, nose, mouth) => ({ eyes, nose, mouth }),
)

sample({
  clock: eyesUpdated,
  target: $eyes,
})
sample({
  clock: noseUpdated,
  target: $nose,
})
sample({
  clock: mouthUpdated,
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
