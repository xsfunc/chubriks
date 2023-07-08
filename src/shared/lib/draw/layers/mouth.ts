import { defaultFace } from '../methods'
import type { DrawFaceProps } from '../types'

export const mouthVariants = ['ܫ', '⌢', 'Ɛ', 'ε', '〜', '‿', '෴', '_', 'ʚ', '▂', '‸', '◡', 'ᗣ', '▂', '〰', '∇', '⌓', '︹']
export function drawMouth({ canvas, composition }: DrawFaceProps) {
  const face = composition.face || defaultFace
  const draw = canvas.draw
  const mouth = face.mouth

  draw.text(mouthVariants[mouth.variant])
    .font({
      size: mouth.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx)
    .cy(canvas.cy)
}
