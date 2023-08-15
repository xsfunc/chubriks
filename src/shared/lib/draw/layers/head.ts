import type { Element, Gradient } from '@svgdotjs/svg.js'
import Filter from '@svgdotjs/svg.filter.js'
import type { DrawingSet } from '../types'
import { createEffect } from '../effects/create-effect'

export function drawHead({ canvas, supplies }: DrawingSet) {
  const { head, fillingFactory, patternsFactory } = supplies
  if (isEmpty(head))
    return

  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width
  let headFill: Element | string

  if (fillingFactory.isColor(head.fill))
    headFill = fillingFactory.fillingByOptions(head.fill) as string
  if (fillingFactory.isGradient(head.fill)) {
    headFill = fillingFactory.fillingByOptions(head.fill) as Gradient
    canvas.draw.add(headFill)
  }
  if (patternsFactory.isPattern(head.fill)) {
    headFill = patternsFactory.createPattern(head.fill)
    canvas.draw.add(headFill)
  }

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
  if (!head.hideNeck) {
    canvas.draw
      .rect(head.width / 2, head.height / 1.5)
      .radius(headRadius)
      .cx(canvas.cx)
      .y(canvas.cy)
      .back()
      .fill(headFill)
  }

  if (head.effects.length) {
    const filter = new Filter()
    filter.attr({ x: '-50%', y: '-70%', width: '200%', height: '220%' })
    filter.css('color-interpolation-filters', 'sRGB')
    for (const id of head.effects) {
      const feOptions = supplies.effects.find(effect => effect.id === id)
      const effectResult = createEffect(feOptions)
      effectResult(filter)
    }
    canvas.draw.parent().add(filter)
    canvas.draw.filterWith(filter)
  }
}

export function drawHeadStroke({ canvas, supplies }: DrawingSet) {
  const { head, fillingFactory, patternsFactory } = supplies
  if (isEmpty(head))
    return

  const parent = canvas.draw.parent()
  const headMask = parent.mask()
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width

  let headStroke
  if (patternsFactory.isPattern(head.stroke)) {
    headStroke = patternsFactory.createPattern(head.stroke)
    canvas.draw.add(headStroke as Element)
  }
  if (fillingFactory.isGradient(head.stroke)) {
    headStroke = fillingFactory.fillingByOptions(head.stroke) as Gradient
    canvas.draw.add(headStroke)
  }
  if (fillingFactory.isColor(head.stroke))
    headStroke = fillingFactory.fillingByOptions(head.stroke) as string

  const headForm = canvas.draw
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({ 'stroke-width': head.strokeWidth })
    .fill('none')
    .stroke(headStroke)

  headMask
    .add(parent.rect(canvas.size, canvas.size).fill('white'))
    .add(headForm.clone().fill('black'))

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
    .maskWith(headMask)
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
  if (!head.hideNeck) {
    canvas.draw
      .rect(head.width / 2, head.height / 1.5)
      .radius(headRadius)
      .cx(canvas.cx)
      .y(canvas.cy)
      .back()
      .fill('none')
      .stroke(headStroke)
      .maskWith(headMask)
      .attr({
        'stroke-width': head.strokeWidth,
      })
  }

  if (head.strokeEffects.length) {
    const filter = new Filter()
    filter.attr({ x: '-150%', y: '-160%', width: '300%', height: '320%' })
    filter.css('color-interpolation-filters', 'sRGB')
    for (const id of head.strokeEffects) {
      const feOptions = supplies.effects.find(effect => effect.id === id)
      const effectResult = createEffect(feOptions)
      effectResult(filter)
    }

    parent.add(filter)
    canvas.draw.filterWith(filter)
  }
}

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
