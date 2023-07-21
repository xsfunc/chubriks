import { debug } from 'patronum'
import { drawManager, flowManager, fxhashApi } from '@/shared/lib'
import '@/features/draw-canvas'

debug({
  configParam: fxhashApi.params.config,
  effectsParam: fxhashApi.params.effects,
  pattenParam: fxhashApi.params.patterns,
  drawDone: drawManager.drawDone,
  drawFailed: drawManager.drawFailed,
  nodesCompose: flowManager.nodesCompose,
})

const defaultEffectsParam: object[] = []
const defaultConfigParam = {
  palette: {
    seed: 0,
    hueShift: 10,
  },
  head: {
    width: 10,
    height: 10,
    radius: 5,
    strokeWidth: 5,
    face: {
      eyes: {
        size: 5,
        variant: 1,
      },
      nose: {
        size: 5,
        variant: 1,
      },
      mouth: {
        size: 5,
        variant: 1,
      },
    },
    effectsIds: [],
  },
  back: {
    fill: {
      type: 'color',
      colorId: 0,
    },
    effectsIds: [],
  },
}

fxhashApi.manager.init({
  features: {},
  params: [
    {
      id: 'config',
      name: 'Config',
      type: 'string',
      default: JSON.stringify(defaultConfigParam),
      update: 'code-driven',
      options: {
        minLength: 5,
        maxLength: 900,
      },
    },
    {
      id: 'effects',
      name: 'Effects',
      type: 'string',
      default: JSON.stringify(defaultEffectsParam),
      update: 'code-driven',
      options: {
        minLength: 5,
        maxLength: 900,
      },
    },
  ],
})
