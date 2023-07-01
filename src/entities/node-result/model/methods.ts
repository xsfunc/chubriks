import '@svgdotjs/svg.filter.js'
import { getIncomers } from 'reactflow'
import type { CompositionFromNodeProps, DrawFaceProps, FaceProps } from './types'

const defaultFace: FaceProps = {
  width: 400,
  height: 400,
  radius: 5,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 5,
  eyes: {
    fill: 'black',
    radius: 40,
    size: 50,
  },
}

export function drawFace({ canvas, composition }: DrawFaceProps) {
  canvas.draw.clear()

  const face = composition.face || defaultFace
  const faceMinSideSize = Math.min(face.width, face.height)
  const faceRadius = face.radius / 200 * faceMinSideSize
  const faceRatio = face.height / face.width
  const faceSvg = canvas.draw
    .rect(face.width, face.height)
    .radius(faceRadius)
    .cx(canvas.cx)
    .cy(canvas.cy)
    .attr({
      'fill': face.fill,
      'stroke': face.stroke,
      'stroke-width': face.strokeWidth,
    })

  const earsSize = faceMinSideSize / 4
  const earsRadius = face.radius / 200 * earsSize
  const earsInside = 0
  const leftEar = canvas.draw
    .rect(earsSize, earsSize * faceRatio)
    .radius(earsRadius)
    .cx(canvas.cx - face.width / 2 + earsInside)
    .after(faceSvg)
    .attr({
      'y': (canvas.size - earsSize) / 2,
      'fill': face.fill,
      'stroke': face.stroke,
      'stroke-width': face.strokeWidth,
    })

  // RIGHT EAR
  leftEar.clone()
    .dx(face.width)
    .addTo(canvas.draw)
    .back()

  // NECK
  canvas.draw
    .rect(face.width / 2, face.height / 1.5)
    .radius(faceRadius)
    .cx(canvas.cx)
    .y(canvas.cy)
    .back()
    .attr({
      'fill': face.fill,
      'stroke': face.stroke,
      'stroke-width': face.strokeWidth,
    })

  const eyes = face.eyes || defaultFace.eyes
  const maxRadius = eyes.size / 2
  // LEFT EYE
  const leftEye = canvas.draw
    .rect(eyes.size, eyes.size)
    .radius(eyes.radius / 100 * maxRadius)
    .cx(canvas.cx - face.width / 6)
    .cy(canvas.cy)
    .attr({
      'fill': eyes.fill,
      'stroke': face.stroke,
      'stroke-width': face.strokeWidth,
    })

  // RIGHT EYE
  leftEye
    .clone()
    .addTo(canvas.draw)
    .cx(canvas.cx + face.width / 6)

  if (face.nose) {
    // NOSE
    const { nose } = face
    canvas.draw
      .rect(nose.size, nose.size * 2)
      .radius(nose.size / 2)
      .cx(canvas.cx)
      .y(rightEye.cy())
      .attr({
        'fill': face.fill,
        'stroke': face.stroke,
        'stroke-width': face.strokeWidth,
      })
  }

  const effects = face.effects
  if (effects?.filters) {
    faceSvg.filterWith((add) => {
      for (const filter of effects.filters) {
        if (filter.type === 'blur')
          add.gaussianBlur(filter.data.amount)
      }
    })
  }

  faceSvg.css({
    // filter: 'grayscale(80%)',
    filter: 'drop-shadow(16px 16px 20px black)',
  })
}

export function compositionDataFromRoot({ rootNode, nodes, edges }: CompositionFromNodeProps) {
  const incomers = getIncomers(rootNode, nodes, edges)
  let data = { ...rootNode.data }
  // Recursive traversal of child nodes
  for (const node of incomers) {
    const childData = compositionDataFromRoot({ rootNode: node, nodes, edges })
    data = { ...data, [childData.prop]: childData }
  }
  return data
}
