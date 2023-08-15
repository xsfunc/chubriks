import type { DrawProps } from './types'
import { fillingApi } from './filling'
import { layers } from './layers'
import { patternsApi } from './patterns'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()
  canvas.draw.group().clear()

  // canvas background
  canvas.draw
    .rect(canvas.size, canvas.size)
    .fill(fillingApi.defaultColors[1])

  const patterns = composition.patterns
  const gradients = composition.gradients
  const poline = fillingApi.createPoline(composition.palette)
  const palette = fillingApi.polinePalette(poline)
  const fillingFactory = fillingApi.createFactory({ palette, gradients })
  const patternsFactory = patternsApi.createFactory({ patterns, fillingFactory })
  const withExtraStuff = { ...composition, fillingFactory, patternsFactory }

  layers.drawBackground({ canvas, supplies: withExtraStuff })

  const headGroup = canvas.draw.group()
  const withHeadGroup = { ...canvas, draw: headGroup }
  layers.drawHead({ canvas: withHeadGroup, supplies: withExtraStuff })

  const strokeGroup = canvas.draw.group()
  const withStrokeGroup = { ...canvas, draw: strokeGroup }
  layers.drawHeadStroke({ canvas: withStrokeGroup, supplies: withExtraStuff })
  layers.drawEyes({ canvas: withStrokeGroup, supplies: withExtraStuff })
  layers.drawMouth({ canvas: withStrokeGroup, supplies: withExtraStuff })
}
