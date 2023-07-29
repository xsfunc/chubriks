import type { Element } from '@svgdotjs/svg.js'
import type { DrawProps } from '../types'

export const eyeVariants = ['A', 'ཀ', 'ಠ', '⋋', '=◉', '⊹', 'Ɵ͆', '▨', '˶⚈', 'ಸ', '¯͒', '◕', 'ಠ', '◑', '︶', '・', '◉', '■', '⇀', '‾̀', '⊙', '✪', '๏', 'Θ', 'ᗒ', 'ര', ' ͡°', '－', '☭', '≖', '◪', '*•', '◣', '⚈', 'ಥ', '✦', '●´']
export const mouthVariants = ['ܫ', '⌢', 'Ɛ', 'ε', '〜', '‿', '෴', '_', 'ʚ', '▂', '‸', '◡', 'ᗣ', '▂', '〰', '∇', '⌓', '︹']
export const noseVariants = ['ʖ', 'ᴥ', '⋏', 'ω', '꒫', 'ൠ', '㉨', 'ᆺ', 'ｪ', '益']

export function drawEyes({ canvas, composition }: DrawProps) {
  const { face, head } = composition
  const draw = canvas.draw
  const eyes = face.eyes

  if (!head.eyes)
    return

  const headStroke = getPaint(head.stroke, composition)
  const leftEye = draw.text(eyeVariants[eyes.variant])
    .font({
      family: 'monospace',
      size: eyes.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .cx(canvas.cx - head.width / 6)
    .cy(canvas.cy + eyes.y)
    .fill(headStroke as Element)

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

  const headStroke = getPaint(head.stroke, composition)
  draw.text(mouthVariants[mouth.variant])
    .font({
      family: 'Noto Sans Symbols',
      size: mouth.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .cx(canvas.cx)
    .cy(canvas.cy + head.height / 4 + mouth.y)
    .fill(headStroke as Element)
}

export function drawNose({ canvas, composition }: DrawProps) {
  const { head, face } = composition
  const nose = face.nose
  const draw = canvas.draw

  if (!head.nose)
    return

  const headStroke = getPaint(head.stroke, composition)
  draw.text(noseVariants[nose.variant])
    .font({
      family: 'Public sans',
      size: nose.size,
      anchor: 'middle',
      leading: '1.5em',
    })
    .cx(canvas.cx)
    .cy(canvas.cy + head.height / 6 + nose.y)
    .fill(headStroke as Element)
}
