import { getPaint } from '../lib'
import type { DrawProps } from '../types'

export function drawBackground({ canvas, composition }: DrawProps) {
  const paint = getPaint(composition.background)

  if (composition.background.type === 'pattern')
    canvas.draw.add(paint)

  canvas.draw
    .rect(canvas.size, canvas.size)
    .fill(paint)
}
