import { cssDropShadow } from './css-drop-shadow'
import { cssGrayscale } from './css-grayscale'
import { cssInvert } from './css-invert'
import { cssOpacity } from './css-opacity'
import { cssSepia } from './css-sepia'
import { EFFECT } from './effect'
import { svgBlur } from './svg-blur'
import { svgConvolveMatrix } from './svg-convolve-matrix'
import { svgDisplacementMap } from './svg-displacement'
import { svgTurbulence } from './svg-turbulence'
import type { EffectOptions } from './types'

export function createEffect(options: EffectOptions) {
  const effectsFnMap = {
    [EFFECT.BLUR]: svgBlur.add,
    [EFFECT.TURBULENCE]: svgTurbulence.add,
    [EFFECT.CONVOLVE_MATRIX]: svgConvolveMatrix.add,
    [EFFECT.DISPLACEMENT]: svgDisplacementMap.add,
    [EFFECT.DROP_SHADOW]: cssDropShadow.add,
    [EFFECT.GRAYSCALE]: cssGrayscale.add,
    [EFFECT.INVERT]: cssInvert.add,
    [EFFECT.SEPIA]: cssSepia.add,
    [EFFECT.OPACITY]: cssOpacity.add,
  } as const

  const effectFn = effectsFnMap[options.type]
  return effectFn(options)
}
