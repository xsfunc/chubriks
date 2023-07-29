import { createEffect, createEvent, createStore, sample } from 'effector'
import { SVG } from '@svgdotjs/svg.js'
import type { CompositionProps } from '../types'
import { drawComposition } from '../lib'

const canvasSize = 1000
const initialCanvas = {
  viewBox: `0 0 ${canvasSize} ${canvasSize}`,
  size: canvasSize,
  cx: canvasSize / 2,
  cy: canvasSize / 2,
  draw: SVG(),
}

const drawFx = createEffect(drawComposition)
const drawCalled = createEvent<{ config: CompositionProps; effects: object[]; patterns: object[] }>()
const $canvas = createStore(initialCanvas)

export const drawManager = {
  canvas: $canvas,
  draw: drawCalled,
  drawDone: drawFx.done,
  drawFailed: drawFx.fail,
  isDrawing: drawFx.pending,
}

sample({
  clock: drawCalled,
  source: $canvas,
  fn: (canvas, { config, effects, patterns }) => ({
    composition: { ...config, effects, patterns },
    canvas,
  }),
  target: drawFx,
})
