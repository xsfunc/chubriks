import { FE } from './constants'
import { feBlend } from './fe-blend'
import { feBlur } from './fe-blur'
import { feColorMatrix } from './fe-color-matrix'
import { feComponentTransfer } from './fe-component-transfer'
import { feComposite } from './fe-composite'
import { feConvolveMatrix } from './fe-convolve-matrix'
import { feDisplacement } from './fe-displacement'
import { feFlood } from './fe-flood'
import { feMerge } from './fe-merge'
import { feMorphology } from './fe-morphology'
import { feOffset } from './fe-offset'
import { feTurbulence } from './fe-turbulence'
import type { FeIn, FeOptions } from './types'

export function createEffect(options: FeOptions) {
  const effectsFnMap = {
    [FE.BLEND]: feBlend.add,
    [FE.BLUR]: feBlur.add,
    [FE.TURBULENCE]: feTurbulence.add,
    [FE.DISPLACEMENT]: feDisplacement.add,
    [FE.COLOR_MATRIX]: feColorMatrix.add,
    [FE.COMPONENT_TRANSFER]: feComponentTransfer.add,
    [FE.COMPOSITE]: feComposite.add,
    [FE.CONVOLVE_MATRIX]: feConvolveMatrix.add,
    [FE.MERGE]: feMerge.add,
    [FE.FLOOD]: feFlood.add,
    [FE.MORPHOLOGY]: feMorphology.add,
    [FE.OFFSET]: feOffset.add,
  } as const
  const effectFn = effectsFnMap[options.type]
  // @ts-expect-error I'm stupid to solve this
  return effectFn(options)
}

export function formatInputId(id: FeIn) {
  if (id === 0)
    return 'SourceGraphic'
  if (id === 1)
    return 'SourceAlpha'
  if (id === null)
    return undefined
  return id
}
