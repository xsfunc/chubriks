import Filter from '@svgdotjs/svg.filter.js'
import type { DrawingSet } from '../types'
import { createEffect } from '../effects/create-effect'

export function drawBackground({ canvas, supplies }: DrawingSet) {
  const { back, patternsFactory, fillingFactory } = supplies
  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)

  if (patternsFactory.isPattern(back.fill)) {
    const pattern = patternsFactory.createPattern(back.fill)
    canvas.draw.root().add(pattern)
    rect.fill(pattern)
  }

  if (fillingFactory.isColor(back.fill)) {
    const backgroundFilling = fillingFactory.fillingByOptions(back.fill)
    rect.fill(backgroundFilling)
  }

  if (back.effects.length) {
    const filter = new Filter()
    for (const id of back.effects) {
      const feOptions = supplies.effects.find(effect => effect.id === id)
      const effectResult = createEffect(feOptions)
      effectResult(filter)
    }

    rect.root().add(filter)
    rect.filterWith(filter)
  }
}
