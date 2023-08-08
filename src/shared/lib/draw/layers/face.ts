import type { Element } from '@svgdotjs/svg.js'
import { SVG } from '@svgdotjs/svg.js'
import type { DrawingSet } from '../types'
import { Gradient } from '@svgdotjs/svg.js'

export const eyesPaths = [
  'M38.354,64.377c-1.115-5.819,2.695-11.44,8.518-12.56c4.652-0.892,9.15,2.156,10.049,6.811c0.711,3.724-1.728,7.324-5.453,8.038c-2.979,0.574-5.859-1.379-6.43-4.359',
  'M294.368,62.871c0,4.204-3.015,7.613-6.734,7.613c-3.721,0-6.735-3.409-6.735-7.613s3.015-7.613,6.735-7.613C291.353,55.257,294.368,58.667,294.368,62.871z',
  'M158.444,61.321 L180.302,61.321',
  'M408.248,59.708 L408.247,70.727 M413.757,65.217 L402.737,65.217',
  'M165.094,150.601c-2.455,1.402-4.105,3.963-4.105,6.898c0,4.438,3.756,8.035,8.393,8.035c3.871,0,7.121-2.514,8.09-5.927L165.094,150.601z',
  'M339.311,158.15c1.072,1.35,1.744,3.113,1.744,5.068c0,4.205-3.016,7.613-6.734,7.613c-3.721,0-6.736-3.408-6.736-7.613c0-0.467,0.051-0.922,0.123-1.369L339.311,158.15z',
  'M401.033,154.071c0,0,7.067-5.5,18.942-5.25',
  'M37.83,238.046 L59.688,238.046 M47.231,238.046v7.026c0,2.729,2.214,4.942,4.942,4.942c2.729,0,4.942-2.214,4.942-4.942v-7.026H47.231z',
  'M403.674,335.997 L412.822,331.654 L403.674,327.31',
  'M338.286,333.667 L333.448,329.566 L328.612,333.667',
  'M97.009,421.382 L89.217,429.174',
]

export const mouthPaths = [
  'M58.869,78.986c5.9,6.283,15.88,6.283,21.78,0',
  'M201.263,80.15c-1.584,10.317-20.196,10.317-21.78,0v-5.354h21.78V80.15z',
  'M299.8,86.261 L310.987,73.737 L322.173,86.261',
  'M442.491,83.698c-5.9-6.283-15.88-6.283-21.78,0',
  'M319.413,262.044c-5.061-3.465-11.791-3.465-16.853-0.001',
  'M443.074,443.452c-1.738,5.993-8.713,6.378-11.473,1.668c-2.762,4.71-9.734,4.325-11.473-1.668',
  'M416.773,257.587 L446.43,257.587',
]

function toSvg(path: string) {
  return SVG()
    .path(path)
    .stroke({ width: 1, linecap: 'round', linejoin: 'round', miterlimit: 10 })
}

export const eyesSvg = eyesPaths.map(toSvg)
export const mouthsSvg = mouthPaths.map(toSvg)

export function drawEyes({ canvas, supplies }: DrawingSet) {
  const { face, head, fillingFactory, patternsFactory } = supplies
  if (!head.eyes)
    return

  const draw = canvas.draw
  const eyes = face.eyes
  const eyeVariant = eyesSvg[eyes.variant]
  draw.add(eyeVariant)

  let headStroke
  if (patternsFactory.isPattern(head.stroke)) {
    headStroke = patternsFactory.createPattern(head.stroke)
    canvas.draw.add(headStroke as Element)
  }
  if (fillingFactory.isGradient(head.stroke)) {
    headStroke = fillingFactory.fillingByOptions(head.stroke) as Gradient
    canvas.draw.add(headStroke)
  }
  if (fillingFactory.isColor(head.stroke))
    headStroke = fillingFactory.fillingByOptions(head.stroke)

  const leftEye = eyeVariant
    .cx(canvas.cx - head.width / 6)
    .cy(canvas.cy + eyes.y)
    .stroke({ width: Math.max(head.strokeWidth / 3, 3) })
    .stroke(headStroke)
    .fill('none')

  const rightEye = leftEye
    .clone()
    .addTo(canvas.draw)
    .cx(canvas.cx + head.width / 6)

  leftEye.transform({
    scale: eyes.size,
  })
  rightEye.transform({
    scale: eyes.size,
  })

  if (eyes.mirror)
    rightEye.flip('x')
}

export function drawMouth({ canvas, supplies }: DrawingSet) {
  const { face, head, fillingFactory, patternsFactory } = supplies
  if (!head.mouth)
    return

  const mouth = face.mouth
  const draw = canvas.draw
  const mouthVariant = mouthsSvg[mouth.variant]
  draw.add(mouthVariant)

  let headStroke
  if (patternsFactory.isPattern(head.stroke)) {
    headStroke = patternsFactory.createPattern(head.stroke)
    canvas.draw.add(headStroke as Element)
  }
  if (fillingFactory.isGradient(head.stroke)) {
    headStroke = fillingFactory.fillingByOptions(head.stroke) as Gradient
    canvas.draw.add(headStroke)
  }
  if (fillingFactory.isColor(head.stroke))
    headStroke = fillingFactory.fillingByOptions(head.stroke)


  const mouthSvg = mouthVariant
    .cx(canvas.cx)
    .cy(canvas.cy + head.height / 4 + mouth.y)
    .stroke({ width: Math.max(head.strokeWidth / 3, 3) })
    .stroke(headStroke)
    .fill('none')

  mouthSvg.transform({
    scale: mouth.size,
  })
}
