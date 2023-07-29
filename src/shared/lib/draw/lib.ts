import type { DrawProps } from './types'
import { fillingApi } from './filling'
import { layers } from './layers'
import { patternsApi } from './patterns'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  const patterns = composition.patterns
  const poline = fillingApi.createPoline(composition.palette)
  const palette = fillingApi.polinePalette(poline)
  const fillingFactory = fillingApi.createFactory({ palette })
  const patternsFactory = patternsApi.createFactory({ patterns, fillingFactory })
  const withExtraStuff = { ...composition, fillingFactory, patternsFactory }

  layers.drawBackground({ canvas, supplies: withExtraStuff })

  const headGroup = canvas.draw.group()
  const withHeadGroup = { ...canvas, draw: headGroup }
  layers.drawHead({ canvas: withHeadGroup, supplies: withExtraStuff })

  const strokeGroup = canvas.draw.group()
  const withStrokeGroup = { ...canvas, draw: strokeGroup }
  layers.drawHeadStroke({ canvas: withStrokeGroup, supplies: withExtraStuff })
  // layers.drawEyes({ canvas: withStrokeGroup, composition: withColors })
  // layers.drawNose({ canvas: withStrokeGroup, composition: withColors })
  // layers.drawMouth({ canvas: withStrokeGroup, composition: withColors })

  // let cssFilterValue = ''
  // const filter = new Filter()
  // filter.addTo(strokeGroup)
  // for (const id of composition.head.strokeEffects) {
  //   const effect = composition.effects.find(effect => effect.id === id)
  //   const effectResult = createEffect(effect)
  //   if (effect.css)
  //     cssFilterValue += effectResult
  //   else
  //     effectResult(filter)
  //   // filter.filterWith(effectResult)
  // }
  // if (composition.head.strokeEffects.length)
  //   strokeGroup.filterWith(filter)

  // strokeGroup.css({
  //   filter: `${cssFilterValue} url(#${filter.id()})`,
  // })
}
