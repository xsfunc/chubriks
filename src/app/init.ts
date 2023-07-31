import { debug } from 'patronum'
import { drawApi, flowApi, fxhashApi } from '@/shared/lib'
import { patternsModel } from '@/entities/patterns'

import '@/features/draw-canvas'
import { configApi } from '@/shared/config'
import { effectsModel } from '@/entities/effects'

debug({
  inIds: effectsModel.inputEffectsIds,
  changePatter: patternsModel.changePattern,
  patternList: patternsModel.patternsList,

  drawDone: drawApi.manager.drawDone,
  drawFailed: drawApi.manager.drawFailed,

  // nodes: flowApi.manager.nodes,
  nodesCompose: flowApi.manager.nodesCompose,

  configParam: fxhashApi.params.config,
  effectsParam: fxhashApi.params.effects,
  patternParam: fxhashApi.params.patterns,
})

fxhashApi.manager.init({
  features: {},
  params: [
    {
      id: 'config',
      name: 'Config bytes',
      type: 'bytes',
      default: configApi.uint8EncodedConfig,
      update: 'code-driven',
      options: {
        length: 512,
      },
    },
    {
      id: 'effects',
      name: 'Effects bytes',
      type: 'bytes',
      default: configApi.uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 1024,
      },
    },
    {
      id: 'patterns',
      name: 'Patterns bytes',
      type: 'bytes',
      default: configApi.uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 1024,
      },
    },
  ],
})
