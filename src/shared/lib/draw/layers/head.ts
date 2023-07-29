import type { Element } from '@svgdotjs/svg.js'
import type { DrawingSet } from '../types'

export function drawHead({ canvas, supplies }: DrawingSet) {
  const { head, fillingFactory, patternsFactory } = supplies
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width
  let headFill: Element | string

  if (fillingFactory.isColor(head.fill))
    headFill = fillingFactory.fillingByOptions(head.fill)
  if (patternsFactory.isPattern(head.fill)) {
    headFill = patternsFactory.createPattern(head.fill) as Element
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
  canvas.draw
    .rect(head.width / 2, head.height / 1.5)
    .radius(headRadius)
    .cx(canvas.cx)
    .y(canvas.cy)
    .back()
    .fill(headFill)

  // let cssFilterValue = ''
  // for (const id of head.effects) {
  //   const effect = composition.effects.find(effect => effect.id === id)
  //   const effectResult = createEffect(effect)

  //   if (effect.css)
  //     cssFilterValue += effectResult
  //   else
  //     canvas.draw.filterWith(effectResult)
  // }

  // canvas.draw.css({
  //   filter: cssFilterValue,
  // })
}

export function drawHeadStroke({ canvas, supplies }: DrawingSet) {
  const { head, fillingFactory, patternsFactory } = supplies
  const root = canvas.draw.root()
  const headMask = root.mask()
  const headMinSideSize = Math.min(head.width, head.height)
  const headRadius = head.radius / 200 * headMinSideSize
  const headRatio = head.height / head.width

  let headStroke
  if (patternsFactory.isPattern(head.stroke)) {
    headStroke = patternsFactory.createPattern(head.stroke)
    canvas.draw.add(headStroke as Element)
  }
  if (fillingFactory.isColor(head.stroke))
    headStroke = fillingFactory.fillingByOptions(head.stroke)

  const headForm = canvas.draw
    .rect(head.width, head.height)
    .radius(headRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({ 'stroke-width': head.strokeWidth })
    .fill('none')
    .stroke(headStroke)

  headMask
    .add(root.rect(canvas.size, canvas.size).fill('white'))
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
