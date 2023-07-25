import { debug } from 'patronum'
import { drawManager, flowManager, fxhashApi } from '@/shared/lib'
import '@/features/draw-canvas'
import { patternsModel } from '@/entities/patterns'

debug({
  changePatter: patternsModel.changePattern,
  nodes: flowManager.nodes,
  configParam: fxhashApi.params.config,
  effectsParam: fxhashApi.params.effects,
  pattenParam: fxhashApi.params.patterns,
  drawDone: drawManager.drawDone,
  drawFailed: drawManager.drawFailed,
  nodesCompose: flowManager.nodesCompose,
})

const defaultConfigParam = {
  palette: {
    seed: 0,
    hueShift: 0,
  },
  face: {
    eyes: {
      size: 50,
      variant: 1,
      y: 0,
      mirror: false,
    },
    nose: {
      size: 50,
      variant: 1,
      y: 0,
    },
    mouth: {
      size: 50,
      variant: 1,
      y: 0,
    },
  },
  head: {
    width: 500,
    height: 650,
    radius: 50,
    eyes: false,
    nose: false,
    mouth: false,
    stroke: {
      type: 'color',
      color: 'black',
    },
    fill: {
      type: 'color',
      color: 'white',
    },
    strokeWidth: 5,
    effects: [],
  },
  back: {
    fill: {
      type: 'color',
      color: 'white',
    },
    effects: [],
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
      default: JSON.stringify([]),
      update: 'code-driven',
      options: {
        minLength: 5,
        maxLength: 900,
      },
    },
    {
      id: 'patterns',
      name: 'Patterns',
      type: 'string',
      default: JSON.stringify([]),
      update: 'code-driven',
      options: {
        minLength: 5,
        maxLength: 900,
      },
    },
  ],
})
