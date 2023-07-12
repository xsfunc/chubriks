import { createEffect } from '../effects/create-effect'
import { getFilling } from '../lib'
import type { DrawProps } from '../types'

export function drawBackground({ canvas, composition }: DrawProps) {
  const fillingProps = composition.background
  const effects = composition.effects
  const paint = getFilling(fillingProps)

  // add pattern to canvas
  if (fillingProps.type === 'pattern')
    canvas.draw.add(paint)

  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .fill(paint)

  for (const effectOptions of effects) {
    const filter = createEffect(effectOptions)
    rect.filterWith(filter)
  }
}
