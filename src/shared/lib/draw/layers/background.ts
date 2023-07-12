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
    .rect(canvas.size, canvas.size)
    .fill(paint)

  if (effects.svgFilters?.length) {
    canvas.draw.filterWith((add: unknown) => {
      for (const filter of effects.svgFilters) {
        if (filter.type === 'blur') {
          const { x, y } = filter.data
          add.gaussianBlur(x, y)
        }
      }
    })
  }
}
