import { debug } from 'patronum'
import { drawManager, flowManager, fxhash } from '@/shared/lib'
import '@/features/draw-canvas'

debug({
  edges: flowManager.edges,
  configParam: fxhash.configParam,
  drawDone: drawManager.drawDone,
  drawFailed: drawManager.drawFailed,
  nodesCompose: flowManager.nodesCompose,
})

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
  patterns: [],
  effects: [],
}

fxhash.init({
  features: {},
  params: [
    {
      id: 'config',
      name: 'Magic line',
      type: 'string',
      default: JSON.stringify(defaultConfigParam),
      update: 'code-driven',
      options: {
        minLength: 5,
        maxLength: 900,
      },
    },
  ],
})
