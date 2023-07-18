import { createEffect, createEvent, createStore, sample } from 'effector'
import { SVG } from '@svgdotjs/svg.js'
import { drawFace } from './lib'
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
    effects: [],
  },

  background: {
    fill: {
      type: 'color',
      color: '#cccccc',
    },
    effects: [],
  },
}

const drawFx = createEffect(drawFace)
const drawCalled = createEvent()
const $compositionData = createStore(initialResult)
const $canvas = createStore(initialCanvas)

export const drawManager = {
  canvas: $canvas,
  result: $compositionData,
  draw: drawCalled,
}

sample({
  clock: $compositionData,
  source: $canvas,
  fn: (canvas, composition) => ({ canvas, composition }),
  target: drawFx,
})

// debug({ drawFail: drawFx.fail, result: drawManager.result })
