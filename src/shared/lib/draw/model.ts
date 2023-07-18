import { createEffect, createEvent, createStore, sample } from 'effector'
import { SVG } from '@svgdotjs/svg.js'
import { drawComposition } from './lib'
import type { CompositionProps } from './types'

const canvasSize = 1000
const initialCanvas = {
  viewBox: `0 0 ${canvasSize} ${canvasSize}`,
  size: canvasSize,
  cx: canvasSize / 2,
  cy: canvasSize / 2,
  draw: SVG(),
}

const drawFx = createEffect(drawComposition)
const drawCalled = createEvent<CompositionProps>()
const $canvas = createStore(initialCanvas)

export const drawManager = {
  canvas: $canvas,
  draw: drawCalled,
  drawFailed: drawFx.fail,
}

sample({
  clock: drawCalled,
  source: $canvas,
  fn: (canvas, composition) => ({ canvas, composition }),
  target: drawFx,
})
