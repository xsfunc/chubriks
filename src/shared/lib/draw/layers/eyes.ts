import type { DrawProps } from '../types'
import { defaultHead } from './head'

export const eyeVariants = ['ཀ', 'ಠ', '⋋', '=◉', '⊹', 'Ɵ͆', '▨', '˶⚈', 'ಸ', '¯͒', '◕', 'ಠ', '◑', '︶', '・', '◉', '■', '⇀', '‾̀', '⊙', '✪', '๏', 'Θ', 'ᗒ', 'ര', ' ͡°', '－', '☭', '≖', '❤', '◪', '*•', '◣', '⚈', 'ಥ', '✦', '●´']

export function drawEyes({ canvas, composition }: DrawProps) {
  const face = composition.head || defaultHead
  const draw = canvas.draw
  const eyes = face.eyes

  if (!eyes)
    return

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
