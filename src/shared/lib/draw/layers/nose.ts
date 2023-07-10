import type { DrawProps } from '../types'
import { defaultHead } from './head'

export const noseVariants = ['ʖ', 'ᴥ', '⋏', 'ω', '꒫', 'ൠ', '㉨', 'ᆺ', 'ｪ', '益']

export function drawNose({ canvas, composition }: DrawProps) {
  const face = composition.head || defaultHead
  const draw = canvas.draw
  const nose = face.nose

  if (!nose)
    return

  draw.text(noseVariants[nose.variant])
    .font({
      size: nose.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx)
    .cy(canvas.cy + face.height / 6)
}
