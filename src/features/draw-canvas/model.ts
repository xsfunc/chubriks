import { createEvent, sample } from 'effector'
import { drawApi, flowApi, fxhashApi } from '@/shared/lib'
import { paletteModel } from '@/entities/palette'
import { effectsModel } from '@/entities/effects'
import { patternsModel } from '@/entities/patterns'
import { faceModel } from '@/entities/face'

export const drawCanvasCalled = createEvent()

sample({
  clock: effectsModel.effectsList,
  target: fxhashApi.params.updateEffects,
})
sample({
  clock: patternsModel.patternsList,
  target: fxhashApi.params.updatePatterns,
})
sample({
  clock: flowApi.manager.nodesCompose,
  source: fxhashApi.params.config,
  fn: (config, compose) => ({ ...config, ...compose }),
  target: fxhashApi.params.updateConfig,
})
sample({
  clock: faceModel.face,
  source: fxhashApi.params.config,
  fn: (config, face) => ({ ...config, face }),
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
    fxhashApi.manager.inited,
    fxhashApi.params.config,
    fxhashApi.params.effects,
    fxhashApi.params.patterns,
  ],
  source: {
    config: fxhashApi.params.config,
    effects: fxhashApi.params.effects,
    patterns: fxhashApi.params.patterns,
  },
  target: drawApi.manager.draw,
})

// fxpreview
sample({
  clock: drawApi.manager.drawDone,
  source: fxhashApi.manager.context,
  filter: context => context !== 'minting',
  target: fxhashApi.manager.capture,
})
