import { createEvent, sample } from 'effector'
import { drawManager, flowManager, fxhashApi } from '@/shared/lib'
import { paletteModel } from '@/entities/palette'
import { effectsModel } from '@/entities/effects'

export const drawCanvasCalled = createEvent()

sample({
  clock: effectsModel.effectsList,
  target: fxhashApi.params.updateEffects,
})
sample({
  clock: flowManager.nodesCompose,
  source: fxhashApi.params.config,
  fn: (config, compose) => ({ ...config, ...compose }),
  target: fxhashApi.params.updateConfig,
})
sample({
  clock: paletteModel.paletteParam,
  source: fxhashApi.params.config,
  fn: (config, palette) => ({ ...config, palette }),
  target: fxhashApi.params.updateConfig,
})

// draw by params
sample({
  clock: [
    drawCanvasCalled,
    fxhashApi.params.config,
    fxhashApi.params.effects,
  ],
  source: {
    config: fxhashApi.params.config,
    effects: fxhashApi.params.effects,
  },
  target: drawManager.draw,
})
