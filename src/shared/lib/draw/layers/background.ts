import { getFilling } from '../lib'
import type { DrawProps } from '../types'

export function drawBackground({ canvas, composition }: DrawProps) {
  const fillingProps = composition.background
  const paint = getFilling(fillingProps)

  // add pattern to canvas
  if (fillingProps.type === 'pattern')
    canvas.draw.add(paint)

  canvas.draw
    .rect(canvas.size, canvas.size)
    .fill(paint)
}
