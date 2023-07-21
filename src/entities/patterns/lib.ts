import type { PatternComponentMap, PatternNode } from '../node-pattern/types'
import { CrossPattern } from './ui/pattern-cross'
import { HerringbonePattern } from './ui/pattern-herringbone'
import { WavePattern } from './ui/pattern-wave'

export const patternsComponentsMap: PatternComponentMap = {
  waves: WavePattern,
  cross: CrossPattern,
  herringbone: HerringbonePattern,
}

export const patternNodeDefault: PatternNode = {
  id: 'pattern-node',
  type: 'patternNode',
  position: { x: 444, y: 600 },
  data: {
    targetHandles: {
      background: {
        accept: ['color'],
      },
      color1: {
        accept: ['color'],
      },
    },
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },
  },
}
