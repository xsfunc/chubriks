import { defaultFace } from '../methods'
import type { DrawFaceProps } from '../types'

export const noseVariants = ['ʖ', 'ᴥ', '⋏', 'ω', '꒫', 'ൠ', '㉨', 'ᆺ', 'ｪ', '益']
export function drawNose({ canvas, composition }: DrawFaceProps) {
  const face = composition.face || defaultFace
  const draw = canvas.draw
  const nose = face.nose

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
