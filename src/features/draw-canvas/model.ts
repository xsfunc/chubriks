import { createEvent, sample } from 'effector'
import { drawManager, flowManager, fxhash } from '@/shared/lib'
import { paletteModel } from '@/entities/palette'

export const drawCanvasCalled = createEvent()

// update params
sample({
  clock: flowManager.nodesCompose,
  source: fxhash.configParam,
  fn: (config, compose) => ({ ...config, ...compose }),
  target: fxhash.updateConfigParam,
})
// sample({
//   clock: effectsModel.effectsList,
//   source: fxhash.configParam,
//   fn: (config, effects) => ({ ...config, effects }),
//   target: fxhash.updateConfigParam,
// })
sample({
  clock: paletteModel.paletteParam,
  source: fxhash.configParam,
  fn: (config, palette) => ({ ...config, palette }),
  target: fxhash.updateConfigParam,
})

// draw by params
sample({
  clock: [
    drawCanvasCalled,
    fxhash.configParam,
  ],
  source: fxhash.configParam,
  target: drawManager.draw,
})
