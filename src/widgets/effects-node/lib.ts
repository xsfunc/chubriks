import { FeBlur, FeConvolveMatrix, FeDisplacementMap, FeTurbulence } from '@/entities/effects'
import type { FeType } from '@/shared/lib'
import { drawApi } from '@/shared/lib'
import type { CustomNode } from '@/shared/lib/flow/types'

export const effectsNodeDefault: CustomNode & { data: { effects: object[] } } = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 444, y: 900 },
  data: {
    sourceHandles: {
      effects: { type: 'effects' },
    },
    effects: [],
  },
}

export const effectsComponentsMap: Record<FeType, any> = {
  [drawApi.effectMap.BLUR]: FeBlur,
  [drawApi.effectMap.TURBULENCE]: FeTurbulence,
  [drawApi.effectMap.DISPLACEMENT]: FeDisplacementMap,
  [drawApi.effectMap.CONVOLVE_MATRIX]: FeConvolveMatrix,
}
