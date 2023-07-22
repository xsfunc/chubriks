import type { DrawProps } from '../types'

export const eyeVariants = ['ཀ', 'ಠ', '⋋', '=◉', '⊹', 'Ɵ͆', '▨', '˶⚈', 'ಸ', '¯͒', '◕', 'ಠ', '◑', '︶', '・', '◉', '■', '⇀', '‾̀', '⊙', '✪', '๏', 'Θ', 'ᗒ', 'ര', ' ͡°', '－', '☭', '≖', '❤', '◪', '*•', '◣', '⚈', 'ಥ', '✦', '●´']

export function drawEyes({ canvas, composition }: DrawProps) {
  const { face, head } = composition
  const draw = canvas.draw
  const eyes = face.eyes

  if (!head.eyes)
    return

  const leftEye = draw.text(eyeVariants[eyes.variant])
    .font({
      size: eyes.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx - head.width / 6)
    .cy(canvas.cy)

  leftEye
    .clone()
    .addTo(canvas.draw)
    .cx(canvas.cx + head.width / 6)
}
