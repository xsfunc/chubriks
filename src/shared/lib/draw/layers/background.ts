import type { Element } from '@svgdotjs/svg.js'
import { createEffect } from '../effects/create-effect'
import { getPaint, isPattern } from '../lib'
import type { DrawProps } from '../types'

export function drawBackground({ canvas, composition }: DrawProps) {
  const { back } = composition
  if (!back)
    return
  if (Object.keys(back).length === 0)
    return

  const backPaint = getPaint(back.fill, composition)
  if (isPattern(back.fill))
    canvas.draw.add(backPaint as Element)

  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .fill(backPaint as Element)

  for (const id of back.effects || []) {
    const effect = composition.effects.find(effect => effect.id === id)
    const filter = createEffect(effect)
    rect.filterWith(filter)
  }
}
