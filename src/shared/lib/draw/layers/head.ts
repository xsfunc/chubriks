import '@svgdotjs/svg.filter.js'
import { getIncomers } from 'reactflow'
import type { CompositionFromNodeProps, DrawProps } from '../types'
import type { HeadProps } from './head.types'

export const defaultHead: HeadProps = {
  width: 400,
  height: 400,
  radius: 5,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 5,
  eyes: {
    fill: 'black',
    size: 50,
    variant: 1,
  },
  nose: {
    size: 50,
    variant: 0,
  },
  mouth: {
    size: 40,
    variant: 0,
  },
  effects: {
    svgFilters: [],
    cssFilters: [],
  },
}

export function drawHead({ canvas, composition }: DrawProps) {
  const head = composition.head || defaultHead
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width

  const headSvg = canvas.draw
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({
      'fill': head.fill,
      'stroke': head.stroke,
      'stroke-width': head.strokeWidth,
    })

  const earsSize = headMinSideSize / 4
  const earsRadius = head.radius / 200 * earsSize
  const earsInside = 0
  const leftEar = canvas.draw
    .rect(earsSize, earsSize * headRatio)
    .radius(earsRadius)
    .cx(canvas.cx - head.width / 2 + earsInside)
    .after(headSvg)
    .attr({
      'y': (canvas.size - earsSize) / 2,
      'fill': head.fill,
      'stroke': head.stroke,
      'stroke-width': head.strokeWidth,
    })

  // RIGHT EAR
  leftEar.clone()
    .dx(head.width)
    .addTo(canvas.draw)
    .insertBefore(headSvg)

  // NECK
  canvas.draw
    .rect(head.width / 2, head.height / 1.5)
    .radius(headRadius)
    .cx(canvas.cx)
    .y(canvas.cy)
    .back()
    .attr({
      'fill': head.fill,
      'stroke': head.stroke,
      'stroke-width': head.strokeWidth,
    })

  const effects = head.effects
  if (effects.cssFilters?.length) {
    let cssFilterValue = ''
    for (const filter of effects.cssFilters) {
      if (filter.type === 'grayscale')
        cssFilterValue += `grayscale(${filter.data.amount}%) `
      if (filter.type === 'sepia')
        cssFilterValue += `sepia(${filter.data.amount}%) `
      if (filter.type === 'hueRotate')
        cssFilterValue += `hue-rotate(${filter.data.amount}deg) `
      if (filter.type === 'invert')
        cssFilterValue += `invert(${filter.data.amount}%) `
      if (filter.type === 'dropShadow') {
        const { xOffset, yOffset, blurRadius, color } = filter.data
        cssFilterValue += `drop-shadow(${xOffset}px ${yOffset}px ${blurRadius}px ${color}) `
      }
    }

    canvas.draw.css({
      filter: cssFilterValue,
    })
  }

  if (effects.svgFilters?.length) {
    headSvg.filterWith((add: unknown) => {
      for (const filter of effects.svgFilters) {
        if (filter.type === 'blur') {
          const { x, y } = filter.data
          add.gaussianBlur(x, y)
        }
      }
    })
  }
}

export function compositionDataFromRoot({ rootNode, nodes, edges }: CompositionFromNodeProps) {
  const incomers = getIncomers(rootNode, nodes, edges)
  let data = { ...rootNode.data }
  // Recursive traversal of child nodes
  for (const node of incomers) {
    const childData = compositionDataFromRoot({ rootNode: node, nodes, edges })
    data = { ...data, [childData.prop]: childData }
  }
  return data
}

// const effects = head.effects
//   if (effects.cssFilters?.length) {
//     let cssFilterValue = ''
//     for (const filter of effects.cssFilters) {
//       if (filter.type === 'grayscale')
//         cssFilterValue += `grayscale(${filter.data.amount}%) `
//       if (filter.type === 'sepia')
//         cssFilterValue += `sepia(${filter.data.amount}%) `
//       if (filter.type === 'hueRotate')
//         cssFilterValue += `hue-rotate(${filter.data.amount}deg) `
//       if (filter.type === 'invert')
//         cssFilterValue += `invert(${filter.data.amount}%) `
//       if (filter.type === 'dropShadow') {
//         const { xOffset, yOffset, blurRadius, color } = filter.data
//         cssFilterValue += `drop-shadow(${xOffset}px ${yOffset}px ${blurRadius}px ${color}) `
//       }
//     }

//     canvas.draw.css({
//       filter: cssFilterValue,
//     })
//   }

//   if (effects.svgFilters?.length) {
//     headSvg.filterWith((add: unknown) => {
//       for (const filter of effects.svgFilters) {
//         if (filter.type === 'blur') {
//           const { x, y } = filter.data
//           add.gaussianBlur(x, y)
//         }
//       }
//     })
//   }
