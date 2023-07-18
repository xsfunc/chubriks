import type { PaletteNode } from '@/entities/types'

export const paletteNodeDefault: PaletteNode = {
  id: 'palette-node',
  type: 'paletteNode',
  position: { x: -100, y: 500 },
  deletable: false,
  data: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
  },
}
