import '@svgdotjs/svg.filter.js'
import type { DrawProps } from '../types'
import { paintPatternByType } from '../patterns/paint-pattern'
import { createEffect } from '../effects/create-effect'

export function drawHead({ canvas, composition }: DrawProps) {
  const { head, colors } = composition
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width

  const headGroup = canvas.draw.group()
  const headSvg = headGroup
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({ 'stroke-width': head.strokeWidth })

  if (head.fill.type === 'color') {
    const color = head.fill.color || colors[head.fill.colorId]
    headSvg.fill(color)
  }

  else {
    const patternOptions = mapColorsToString(head.fill, colors)
    const pattern = paintPatternByType(patternOptions)
    canvas.draw.add(pattern)
    headSvg.fill(pattern)
  }
  if (head.stroke.type === 'color') {
    const color = head.stroke.color || colors[head.stroke.colorId]
    headSvg.stroke(color)
  }
  else {
    const patternOptions = mapColorsToString(head.stroke, colors)
    const pattern = paintPatternByType(patternOptions)
    canvas.draw.add(pattern)
    headSvg.stroke(pattern)
  }

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
    .addTo(headGroup)

  // RIGHT EAR
  const rightEar = leftEar.clone()
    .dx(head.width)
    .addTo(canvas.draw)
    .insertBefore(headSvg)
    .addTo(headGroup)

  // NECK
  const neck = canvas.draw
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
    .addTo(headGroup)

  // const effects = head.effects
  // if (effects.cssFilters?.length) {
  //   let cssFilterValue = ''
  //   for (const filter of effects.cssFilters) {
  //     if (filter.type === 'grayscale')
  //       cssFilterValue += `grayscale(${filter.data.amount}%) `
  //     if (filter.type === 'sepia')
  //       cssFilterValue += `sepia(${filter.data.amount}%) `
  //     if (filter.type === 'hueRotate')
  //       cssFilterValue += `hue-rotate(${filter.data.amount}deg) `
  //     if (filter.type === 'invert')
  //       cssFilterValue += `invert(${filter.data.amount}%) `
  //     if (filter.type === 'dropShadow') {
  //       const { xOffset, yOffset, blurRadius, color } = filter.data
  //       cssFilterValue += `drop-shadow(${xOffset}px ${yOffset}px ${blurRadius}px ${color}) `
  //     }
  //   }

  //   canvas.draw.css({
  //     filter: cssFilterValue,
  //   })
  // }

  // if (effects.svgFilters?.length) {
  //   headSvg.filterWith((add: unknown) => {
  //     for (const filter of effects.svgFilters) {
  //       if (filter.type === 'blur') {
  //         const { x, y } = filter.data
  //         add.gaussianBlur(x, y)
  //       }
  //     }
  //   })
  // }

  for (const id of head.effects) {
    const effect = composition.effects.find(effect => effect.id === id)
    const filter = createEffect(effect)
    headGroup.filterWith(filter)
    headSvg.filterWith(filter)
    // leftEar.fil
  }
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
