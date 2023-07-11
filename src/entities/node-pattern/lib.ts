import type { PatternNode } from './types'

export const patternNodeDefault: PatternNode = {
  id: 'pattern-node',
  type: 'patternNode',
  position: { x: 700, y: 760 },
  data: {
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },
    type: 'pattern',
    patternType: 'waves1',
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    backgroundColor: '#000000',
  },
}
