import { createEffect, createEvent, createStore, sample } from 'effector'
import { SVG } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.filter.js'
import { debug } from 'patronum'
import { compositionDataFromRoot, drawFace } from './methods'

const canvasSize = 1000
const initialCanvas = {
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

export const svg = {
  canvas: $canvas,
  result: $compositionData,
  syncComposition: syncCompositionDataCalled,
}

debug({ drawFx })

// remove
// const $canvasSize = createStore(canvasSize)
// const $container = createStore(draw)

// export const drawFx = createEffect((data) => {
//   draw.clear()

//   const { head } = data
//   const headMinSideSize = Math.min(head.width, head.height)
//   const headRadius = head.radius / 200 * headMinSideSize
//   const headRatio = head.height / head.width
//   const headSvg = draw
//     .rect(head.width, head.height)
//     .radius(headRadius)
//     .cx(centerX)
//     .cy(centerY)
//     .attr({
//       'fill': head.fill,
//       'stroke': head.stroke,
//       'stroke-width': head.strokeWidth,
//     })

//   headSvg.filterWith((add) => {
//     for (const filter of head.filters) {
//       if (filter.type === 'blur')
//         add.gaussianBlur(filter.data.amount)
//     }
//   })

//   // Ears
//   const earsSize = headMinSideSize / 4
//   const earsRadius = head.radius / 200 * earsSize
//   const earsInside = 0
//   const leftEar = draw
//     .rect(earsSize, earsSize * headRatio)
//     .radius(earsRadius)
//     .cx(centerX - head.width / 2 + earsInside)
//     .attr({
//       'y': (canvasSize - earsSize) / 2,
//       'fill': head.fill,
//       'stroke': head.stroke,
//       'stroke-width': head.strokeWidth,
//     })
//     .after(headSvg)

//   const rightEar = leftEar.clone()
//     .dx(head.width)
//     .addTo(draw)
//     .back()

//   const neck = draw
//     .rect(head.width / 2, head.height / 1.5)
//     .radius(headRadius)
//     .cx(centerX)
//     .y(centerY)
//     .back()
//     .attr({
//       'fill': head.fill,
//       'stroke': head.stroke,
//       'stroke-width': head.strokeWidth,
//     })

//   const { eyes } = data
//   const maxRadius = eyes.size / 2
//   const leftEye = draw
//     .rect(eyes.size, eyes.size)
//     .radius(eyes.radius / 100 * maxRadius)
//     .cx(centerX - head.width / 6)
//     .cy(centerY)
//     .attr({
//       'fill': 'white',
//       'stroke': 'black',
//       'stroke-width': head.strokeWidth,
//     })

//   const rightEye = leftEye
//     .clone()
//     .addTo(draw)
//     .cx(centerX + head.width / 6)

//   const { nose } = data
//   draw
//     .rect(nose.size, nose.size * 2)
//     .radius(nose.size / 2)
//     .cx(centerX)
//     .y(rightEye.cy())
//     .attr({
//       'fill': 'white',
//       'stroke': 'black',
//       'stroke-width': head.strokeWidth,
//     })
// })

// sample({
//   clock: updateResultCalled,
//   source: $compositionData,
//   fn: (result, { part, data }) => ({
//     ...result,
//     [part]: { ...result[part], ...data },
//   }),
//   target: $compositionData,
// })
