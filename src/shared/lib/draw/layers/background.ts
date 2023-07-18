import { getFilling } from '../lib'
import type { DrawProps } from '../types'

export function drawBackground({ canvas, composition }: DrawProps & { colors: string[] }) {
  const { back, colors } = composition
  if (!back)
    return

  const paint = getFilling(back.fill, colors)
  // add pattern to canvas
  if (back.fill.type === 'pattern')
    canvas.draw.add(paint)

  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .fill(paint)

  // for (const id of effects) {
  //   const filter = createEffect(composition.effects[id])
  //   rect.filterWith(filter)
  // }
}
