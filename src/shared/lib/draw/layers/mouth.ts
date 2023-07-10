import type { DrawProps } from '../types'
import { defaultHead } from './head'

export const mouthVariants = ['ܫ', '⌢', 'Ɛ', 'ε', '〜', '‿', '෴', '_', 'ʚ', '▂', '‸', '◡', 'ᗣ', '▂', '〰', '∇', '⌓', '︹']

export function drawMouth({ canvas, composition }: DrawProps) {
  const face = composition.head || defaultHead
  const draw = canvas.draw
  const mouth = face.mouth

  if (!mouth)
    return

  draw.text(mouthVariants[mouth.variant])
    .font({
      size: mouth.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx)
    .cy(canvas.cy + face.height / 4)
}
