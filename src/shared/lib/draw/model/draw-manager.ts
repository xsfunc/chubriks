import { createEffect, createEvent, createStore, sample } from 'effector'
import type { Container } from '@svgdotjs/svg.js'
import { SVG } from '@svgdotjs/svg.js'
import type { CompositionProps, PatternOptions } from '../types'
import { drawComposition } from '../lib'
import type { GradientOptions } from '../filling/types'

const canvasSize = 1000
const viewBox = `0 0 ${canvasSize} ${canvasSize}`
const initialCanvas = {
  size: canvasSize,
  cx: canvasSize / 2,
  cy: canvasSize / 2,
  draw: SVG().viewbox(viewBox),
}

const drawFx = createEffect(drawComposition)
const convertSvgToImageFx = createEffect(convertSvgToImage)
const drawCalled = createEvent<{ config: CompositionProps; effects: object[]; patterns: PatternOptions[]; gradients: GradientOptions[] }>()
const downloadImageCalled = createEvent()
const $canvas = createStore(initialCanvas)

export const drawManager = {
  canvas: $canvas,
  draw: drawCalled,
  drawDone: drawFx.done,
  drawFailed: drawFx.fail,
  isDrawing: drawFx.pending,
  download: downloadImageCalled,
}

sample({
  clock: drawCalled,
  source: $canvas,
  fn: (canvas, { config, effects, patterns, gradients }) => ({
    composition: { ...config, effects, patterns, gradients },
    canvas,
  }),
  target: drawFx,
})

sample({
  clock: downloadImageCalled,
  source: $canvas,
  target: convertSvgToImageFx,
})

function convertSvgToImage({ draw }: { draw: Container }) {
  const canvas = document.createElement('canvas')
  const img = new Image()

  const svgString = draw.svg()
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const svgURL = URL.createObjectURL(svgBlob)

  img.onload = function () {
    const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = 1000
    canvas.height = 1000
    canvasCtx.drawImage(img, 0, 0)

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'chubrick.png'
    link.click()

    URL.revokeObjectURL(svgURL) // free up the object URL to reduce memory usage
  }

  img.src = svgURL
}
