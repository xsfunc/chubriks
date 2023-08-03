import { createEvent, sample } from 'effector'
import { drawApi, flowApi, fxhashApi } from '@/shared/lib'
import { paletteModel } from '@/entities/palette'
import { effectsModel } from '@/entities/effects'
import { patternsModel } from '@/entities/patterns'
import { faceModel } from '@/entities/face'
import { gradientModel } from '@/entities/gradient/model'

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
  clock: gradientModel.gradientsList,
  target: fxhashApi.params.updateGradients,
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

// redraw when params changed
sample({
  clock: [
    drawCanvasCalled,
    fxhashApi.manager.inited,
    fxhashApi.params.config,
    fxhashApi.params.effects,
    fxhashApi.params.patterns,
    fxhashApi.params.gradients,
  ],
  source: {
    config: fxhashApi.params.config,
    effects: fxhashApi.params.effects,
    patterns: fxhashApi.params.patterns,
    gradients: fxhashApi.params.gradients,
  },
  target: drawApi.manager.draw,
})

// fxpreview()
sample({
  clock: drawApi.manager.drawDone,
  source: fxhashApi.manager.context,
  filter: context => context !== 'minting',
  target: fxhashApi.manager.capture,
})
