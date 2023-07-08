import { defaultFace } from '../methods'
import type { DrawFaceProps } from '../types'

export const eyeVariants = ['ཀ', 'ಠ', '⋋', '=◉', '⊹', 'Ɵ͆', '▨', '˶⚈', 'ಸ', '¯͒', '◕', 'ಠ', '◑', '︶', '・', '◉', '■', '⇀', '‾̀', '⊙', '✪', '๏', 'Θ', 'ᗒ', 'ര', ' ͡°', '－', '☭', '≖', '❤', '◪', '*•', '◣', '⚈', 'ಥ', '✦', '●´']
export function drawEyes({ canvas, composition }: DrawFaceProps) {
  const face = composition.face || defaultFace
  const draw = canvas.draw
  const eyes = face.eyes

  const leftEye = draw.text(eyeVariants[eyes.variant])
    .font({
      size: eyes.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx - face.width / 6)
    .cy(canvas.cy)

  leftEye
    .clone()
    .addTo(canvas.draw)
    .cx(canvas.cx + face.width / 6)
}
