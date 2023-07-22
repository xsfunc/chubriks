import { createEffect } from '../effects/create-effect'
import { mapColorsToString, paintPatternByType } from '../patterns/paint-pattern'
import type { DrawProps } from '../types'

export function drawBackground({ canvas, composition }: DrawProps) {
  const { back, colors } = composition
  if (!back || Object.keys(back).length === 0)
    return

  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)

  if (back.fill.type === 'color') {
    const color = colors[back.fill.colorId]
    rect.fill(color)
  }
  else {
    const patternOptions = mapColorsToString(back.fill, colors)
    const pattern = paintPatternByType(patternOptions)
    canvas.draw.add(pattern)
    rect.fill(pattern)
  }

  for (const id of back.effects || []) {
    const effect = composition.effects.find(effect => effect.id === id)
    const filter = createEffect(effect)
    rect.filterWith(filter)
  }
}
