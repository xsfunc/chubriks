import { CssDropShadow, CssGrayscale, CssInvert, CssOpacity, CssSepia, SvgBlurEffect } from '@/entities/effects'
import type { EffectType } from '@/shared/lib'
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

export const effectsComponentsMap: Record<EffectType, any> = {
  [drawApi.effectMap.BLUR]: SvgBlurEffect,
  [drawApi.effectMap.DROP_SHADOW]: CssDropShadow,
  [drawApi.effectMap.GRAYSCALE]: CssGrayscale,
  [drawApi.effectMap.INVERT]: CssInvert,
  [drawApi.effectMap.SEPIA]: CssSepia,
  [drawApi.effectMap.OPACITY]: CssOpacity,
}
