import {
  FeBlend,
  FeBlur,
  FeColorMatrix,
  FeComponentTransfer,
  FeComposite,
  FeConvolveMatrix,
  FeDisplacementMap,
  FeMerge,
  FeMorphology,
  FeOffset,
  FeTurbulence,
} from '@/entities/effects'
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
  [drawApi.effectMap.BLEND]: FeBlend,
  [drawApi.effectMap.BLUR]: FeBlur,
  [drawApi.effectMap.TURBULENCE]: FeTurbulence,
  [drawApi.effectMap.DISPLACEMENT]: FeDisplacementMap,
  [drawApi.effectMap.COLOR_MATRIX]: FeColorMatrix,
  [drawApi.effectMap.COMPONENT_TRANSFER]: FeComponentTransfer,
  [drawApi.effectMap.COMPOSITE]: FeComposite,
  [drawApi.effectMap.CONVOLVE_MATRIX]: FeConvolveMatrix,
  [drawApi.effectMap.MERGE]: FeMerge,
  [drawApi.effectMap.FLOOD]: FeDisplacementMap,
  [drawApi.effectMap.MORPHOLOGY]: FeMorphology,
  [drawApi.effectMap.OFFSET]: FeOffset,
}
