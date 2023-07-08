import { createEffect, createEvent, createStore, sample } from 'effector'
import { SVG } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.filter.js'
import { debug } from 'patronum'
import { compositionDataFromRoot, drawFace } from './methods'

const canvasSize = 1000
const initialCanvas = {
  viewBox: `0 0 ${canvasSize} ${canvasSize}`,
  size: canvasSize,
  cx: canvasSize / 2,
  cy: canvasSize / 2,
  draw: SVG(),
}

const initialResult = {
  hair: {},
  face: {
    fill: 'white',
    stroke: 'black',
    strokeWidth: 10,
    width: 400,
    height: 400,
    radius: 10,
    eyes: {
      fill: 'blur',
      radius: 10,
      size: 20,
      variant: 1,
    },
    nose: {
      size: 100,
      variant: '',
    },
    mouth: {},
  },
  background: {},
}

const syncCompositionDataCalled = createEvent()
const $compositionData = createStore(initialResult)
const $canvas = createStore(initialCanvas)
const drawFx = createEffect(drawFace)

sample({
  clock: syncCompositionDataCalled,
  fn: compositionDataFromRoot,
  target: $compositionData,
})
sample({
  clock: $compositionData,
  source: $canvas,
  fn: (canvas, composition) => ({ canvas, composition }),
  target: drawFx,
})

export const drawManager = {
  canvas: $canvas,
  result: $compositionData,
  syncComposition: syncCompositionDataCalled,
}

debug({ drawFx })
