import type { Element, Pattern } from '@svgdotjs/svg.js'
import Filter from '@svgdotjs/svg.filter.js'
import { layers } from './layers'
import type { CompositionProps, DrawProps, FillingProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'
import { createPoline, polinePalette } from './palette/poline'
import { createEffect } from './effects/create-effect'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  const poline = createPoline(composition.palette)
  const colors = polinePalette(poline)
  const withColors = { ...composition, colors }

  const headGroup = canvas.draw.group()
  const strokeGroup = canvas.draw.group()
  const withHeadGroup = { ...canvas, draw: headGroup }
  const withStrokeGroup = { ...canvas, draw: strokeGroup }

  layers.drawBackground({ canvas, composition: withColors })
  layers.drawHead({ canvas: withHeadGroup, composition: withColors })
  layers.drawHeadStroke({ canvas: withStrokeGroup, composition: withColors })
  layers.drawEyes({ canvas: withStrokeGroup, composition: withColors })
  layers.drawNose({ canvas: withStrokeGroup, composition: withColors })
  layers.drawMouth({ canvas: withStrokeGroup, composition: withColors })

  let cssFilterValue = ''
  const filter = new Filter()
  filter.addTo(strokeGroup)
  for (const id of composition.head.strokeEffects) {
    const effect = composition.effects.find(effect => effect.id === id)
    const effectResult = createEffect(effect)
    if (effect.css)
      cssFilterValue += effectResult
    else
      effectResult(filter)
      // filter.filterWith(effectResult)
  }
  if (composition.head.strokeEffects.length)
    strokeGroup.filterWith(filter)

  strokeGroup.css({
    filter: cssFilterValue,
  })
}

export function isPattern(paintProps: FillingProps) {
  return paintProps.type === 'pattern'
}

export function hasColor(prop: { color: string } | { colorId: number }): prop is { color: string } {
  return (prop as { color: string }).color !== undefined
}

export function getPaint(paintProps: FillingProps, composition: CompositionProps): string | Element | Pattern {
  if (paintProps.type === 'color') {
    if (hasColor(paintProps)) {
      return paintProps.color
    }
    else {
      const id = paintProps.colorId
      return composition.colors[id]
    }
  }
  else if (paintProps.type === 'pattern') {
    const { patternId: id, color1, color2, color3 } = paintProps
    const pattern = {
      ...composition.patterns[id],
      color1: getPaint(color1, composition),
      color2: getPaint(color2, composition),
      color3: getPaint(color3, composition),
    }
    return paintPatternByType(pattern)
  }
  else {
    return 'black'
  }
}
