import Filter from '@svgdotjs/svg.filter.js'
import type { Gradient } from '@svgdotjs/svg.js'
import type { DrawingSet } from '../types'
import { createEffect } from '../effects/create-effect'

export function drawBackground({ canvas, supplies }: DrawingSet) {
  const { back, patternsFactory, fillingFactory } = supplies
  if (isEmpty(back))
    return

  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)

  if (patternsFactory.isPattern(back.fill)) {
    const pattern = patternsFactory.createPattern(back.fill)
    canvas.draw.add(pattern)
    rect.fill(pattern)
  }

  if (fillingFactory.isGradient(back.fill)) {
    const gradient = fillingFactory.fillingByOptions(back.fill) as Gradient
    canvas.draw.add(gradient)
    rect.fill(gradient)
  }

  if (fillingFactory.isColor(back.fill)) {
    const backgroundFilling = fillingFactory.fillingByOptions(back.fill) as string
    rect.fill(backgroundFilling)
  }

  if (back.effects.length) {
    const filter = new Filter()
    filter.css('color-interpolation-filters', 'sRGB')
    for (const id of back.effects) {
      const feOptions = supplies.effects.find(effect => effect.id === id)
      const effectResult = createEffect(feOptions)
      effectResult(filter)
    }

    canvas.draw.add(filter)
    rect.filterWith(filter)
  }
}

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
