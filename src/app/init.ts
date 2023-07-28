import { debug } from 'patronum'
import { encode } from 'msgpack-lite'
import { drawApi, flowApi, fxhashApi } from '@/shared/lib'
import { patternsModel } from '@/entities/patterns'

import '@/features/draw-canvas'

debug({
  changePatter: patternsModel.changePattern,
  patternList: patternsModel.patternsList,

  drawDone: drawApi.manager.drawDone,
  drawFailed: drawApi.manager.drawFailed,

  nodes: flowApi.manager.nodes,
  nodesCompose: flowApi.manager.nodesCompose,

  configParam: fxhashApi.params.config,
  effectsParam: fxhashApi.params.effects,
  patternParam: fxhashApi.params.patterns,
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
    strokeEffects: [],
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

const encodedEmptyArray = encode([])
const uint8EncodedArray = new Uint8Array(encodedEmptyArray)

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
      name: 'Effects bytes',
      type: 'bytes',
      default: uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 1024,
      },
    },
    {
      id: 'patterns',
      name: 'Patterns bytes',
      type: 'bytes',
      default: uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 1024,
      },
    },
  ],
})
