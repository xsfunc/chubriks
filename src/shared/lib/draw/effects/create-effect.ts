import { FE } from './constants'
import { feBlend } from './fe-blend'
import { feBlur } from './fe-blur'
import { feDisplacement } from './fe-displacement'
import { feTurbulence } from './fe-turbulence'

// import { svgConvolveMatrix } from './fe-convolve-matrix'
import type { FeOptions } from './types'

export function createEffect(options: FeOptions) {
  const effectsFnMap = {
    [FE.BLEND]: feBlend.add,
    [FE.BLUR]: feBlur.add,
    [FE.TURBULENCE]: feTurbulence.add,
    [FE.DISPLACEMENT]: feDisplacement.add,
    // [EFFECT.CONVOLVE_MATRIX]: svgConvolveMatrix.add,
    // [EFFECT.DROP_SHADOW]: cssDropShadow.add,
    // [EFFECT.GRAYSCALE]: cssGrayscale.add,
    // [EFFECT.INVERT]: cssInvert.add,
    // [EFFECT.SEPIA]: cssSepia.add,
    // [EFFECT.OPACITY]: cssOpacity.add,
  } as const

  const effectFn = effectsFnMap[options.type]
  return effectFn(options)
}
