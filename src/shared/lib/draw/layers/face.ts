import type { DrawProps } from '../types'

export const mouthVariants = ['ܫ', '⌢', 'Ɛ', 'ε', '〜', '‿', '෴', '_', 'ʚ', '▂', '‸', '◡', 'ᗣ', '▂', '〰', '∇', '⌓', '︹']
export const noseVariants = ['ʖ', 'ᴥ', '⋏', 'ω', '꒫', 'ൠ', '㉨', 'ᆺ', 'ｪ', '益']
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
    .cy(canvas.cy + eyes.y)

  const rightEye = leftEye
    .clone()
    .addTo(canvas.draw)
    .cx(canvas.cx + head.width / 6)

  if (eyes.mirror)
    rightEye.flip('x')
}

export function drawMouth({ canvas, composition }: DrawProps) {
  const { face, head } = composition
  const mouth = face.mouth
  const draw = canvas.draw

  if (!head.mouth)
    return

  draw.text(mouthVariants[mouth.variant])
    .font({
      size: mouth.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx)
    .cy(canvas.cy + head.height / 4 + mouth.y)
}

export function drawNose({ canvas, composition }: DrawProps) {
  const { head, face } = composition
  const nose = face.nose
  const draw = canvas.draw

  if (!head.nose)
    return

  draw.text(noseVariants[nose.variant])
    .font({
      size: nose.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .fill('black')
    .cx(canvas.cx)
    .cy(canvas.cy + head.height / 6 + nose.y)
}
