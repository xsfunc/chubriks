import '@svgdotjs/svg.filter.js'
import type { Element } from '@svgdotjs/svg.js'
import type { DrawProps } from '../types'
import { createEffect } from '../effects/create-effect'
import { getPaint, isPattern } from '../lib'

export function drawHead({ canvas, composition }: DrawProps) {
  const { head } = composition
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width

  const headGroup = canvas.draw.group()
  const headFill = getPaint(head.fill, composition)
  const headStroke = getPaint(head.stroke, composition)

  if (isPattern(head.fill))
    headGroup.add(headFill as Element)
  if (isPattern(head.stroke))
    headGroup.add(headStroke as Element)

  const headSvg = headGroup
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({ 'stroke-width': head.strokeWidth })
    .fill(headFill)
    .stroke(headStroke)

  const earsSize = headMinSideSize / 4
  const earsRadius = head.radius / 200 * earsSize
  const earsInside = 0
  const leftEar = canvas.draw
    .rect(earsSize, earsSize * headRatio)
    .radius(earsRadius)
    .cx(canvas.cx - head.width / 2 + earsInside)
    .after(headSvg)
    .fill(headFill)
    .stroke(headStroke)
    .attr({
      'y': (canvas.size - earsSize) / 2,
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
    .fill(headFill)
    .stroke(headStroke)
    .attr({
      'stroke-width': head.strokeWidth,
    })
    .addTo(headGroup)

  let cssFilterValue = ''
  for (const id of head.effects) {
    const effect = composition.effects.find(effect => effect.id === id)
    const effectResult = createEffect(effect)

    if (effect.css) {
      cssFilterValue += effectResult
    }
    else {
      headGroup.filterWith(effectResult)
      headSvg.filterWith(effectResult)
    }
  }

  headGroup.css({
    filter: cssFilterValue,
  })
}
