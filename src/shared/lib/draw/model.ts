import { createEffect, createEvent, createStore, sample } from 'effector'
import { SVG } from '@svgdotjs/svg.js'
import { debug } from 'patronum'
import { compositionDataFromRoot, drawFace } from './lib'
import type { CompositionProps } from './types'

const canvasSize = 1000
const initialCanvas = {
  viewBox: `0 0 ${canvasSize} ${canvasSize}`,
  size: canvasSize,
  cx: canvasSize / 2,
  cy: canvasSize / 2,
  draw: SVG(),
}

export const initialResult: CompositionProps = {
  hair: {
    size: 54,
    variant: 1,
  },
  head: {
    width: 400,
    height: 400,
    radius: 10,
    strokeWidth: 20,
    fill: { type: 'color', color: 'white' },
    stroke: { type: 'color', color: 'black' },
    eyes: {
      fill: 'blur',
      size: 20,
      variant: 1,
    },
    nose: {
      size: 100,
      variant: 1,
    },
    mouth: {
      size: 45,
      variant: 1,
    },
    effects: {
      cssFilters: [],
      svgFilters: [],
    },
  },

  background: {
    type: 'color',
    color: '#cccccc',
  },
  effects: {
    cssFilters: [],
    svgFilters: [],
  },
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

debug({ drawFail: drawFx.failData, data: drawManager.result })
