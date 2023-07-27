import type { Element } from '@svgdotjs/svg.js'
import type { DrawProps } from '../types'
import { createEffect } from '../effects/create-effect'
import { getPaint, isPattern } from '../lib'

export function drawHead({ canvas, composition }: DrawProps) {
  const { head } = composition
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width
  const headFill = getPaint(head.fill, composition)

  if (isPattern(head.fill))
    canvas.draw.add(headFill as Element)

  const headForm = canvas.draw
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({ 'stroke-width': head.strokeWidth })
    .fill(headFill)

  const earsSize = headMinSideSize / 4
  const earsRadius = head.radius / 200 * earsSize
  const earsInside = 0
  const leftEar = canvas.draw
    .rect(earsSize, earsSize * headRatio)
    .radius(earsRadius)
    .cx(canvas.cx - head.width / 2 + earsInside)
    .fill(headFill)
    .insertBefore(headForm)
    .attr({
      y: (canvas.size - earsSize) / 2,
    })
  // RIGHT EAR
  leftEar.clone()
    .dx(head.width)
    .addTo(canvas.draw)
    .insertBefore(headForm)
  // NECK
  canvas.draw
    .rect(head.width / 2, head.height / 1.5)
    .radius(headRadius)
    .cx(canvas.cx)
    .y(canvas.cy)
    .back()
    .fill(headFill)

  let cssFilterValue = ''
  for (const id of head.effects) {
    const effect = composition.effects.find(effect => effect.id === id)
    const effectResult = createEffect(effect)

    if (effect.css)
      cssFilterValue += effectResult
    else
      canvas.draw.filterWith(effectResult)
  }

  canvas.draw.css({
    filter: cssFilterValue,
  })
}

export function drawHeadStroke({ canvas, composition }: DrawProps) {
  const { head } = composition
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width
  const headStroke = getPaint(head.stroke, composition)

  if (isPattern(head.stroke))
    canvas.draw.add(headStroke as Element)

  const headForm = canvas.draw
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({ 'stroke-width': head.strokeWidth })
    .fill('none')
    .stroke(headStroke)

  const earsSize = headMinSideSize / 4
  const earsRadius = head.radius / 200 * earsSize
  const earsInside = 0
  const leftEar = canvas.draw
    .rect(earsSize, earsSize * headRatio)
    .radius(earsRadius)
    .cx(canvas.cx - head.width / 2 + earsInside)
    .fill('none')
    .stroke(headStroke)
    .insertBefore(headForm)
    .attr({
      'y': (canvas.size - earsSize) / 2,
      'stroke-width': head.strokeWidth,
    })
  // RIGHT EAR
  leftEar.clone()
    .dx(head.width)
    .addTo(canvas.draw)
    .insertBefore(headForm)
  // NECK
  canvas.draw
    .rect(head.width / 2, head.height / 1.5)
    .radius(headRadius)
    .cx(canvas.cx)
    .y(canvas.cy)
    .back()
    .fill('none')
    .stroke(headStroke)
    .attr({
      'stroke-width': head.strokeWidth,
    })
}
