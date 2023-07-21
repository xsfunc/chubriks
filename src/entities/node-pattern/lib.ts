import type { PatternComponentMap, PatternNode } from './types'
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
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },
    type: 'pattern',
    patternType: 'waves',
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    background: 'black',
    color1: 'white',
  },
}
