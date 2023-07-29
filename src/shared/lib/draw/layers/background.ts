import type { DrawingSet } from '../types'

// import Filter from '@svgdotjs/svg.filter.js'

export function drawBackground({ canvas, supplies }: DrawingSet) {
  const { back, patternsFactory, fillingFactory } = supplies
  const rect = canvas.draw
    .rect(canvas.size * 1.1, canvas.size * 1.1)
    .cx(canvas.cx)
    .cy(canvas.cy)

  if (patternsFactory.isPattern(back.fill)) {
    const pattern = patternsFactory.createPattern(back.fill)
    canvas.draw.root().add(pattern)
    rect.fill(pattern)
  }

  if (fillingFactory.isColor(back.fill)) {
    const backgroundFilling = fillingFactory.fillingByOptions(back.fill)
    rect.fill(backgroundFilling)
  }

  // let cssFilterValue = ''
  // const filter = new Filter()
  // filter.addTo(rect)

  // for (const id of back.effects) {
  //   const effect = composition.effects.find(effect => effect.id === id)
  //   const effectResult = createEffect(effect)
  //   if (effect.css)
  //     cssFilterValue += effectResult
  //   else
  //     effectResult(filter)
  //     // filter.filterWith(effectResult)
  // }
  // rect.filterWith(filter)
  // rect.css({
  //   filter: cssFilterValue,
  // })
}
