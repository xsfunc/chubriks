import { fillingApi } from '@/shared/lib/draw/filling'
import type { CustomNode } from '@/shared/lib/flow/types'

const data = Array(10)
  .fill(1)
  .reduce((prev, _, i) =>
    ({ ...prev, [i]: { type: fillingApi.types.PALETTE, id: i } }), {})

const sourceHandles = Array(10)
  .fill(1)
  .reduce((prev, _, i) =>
    ({ ...prev, [i]: { type: 'color' } }), {})

export const paletteNodeDefault: CustomNode = {
  id: 'palette-node',
  type: 'paletteNode',
  position: { x: -100, y: 500 },
  deletable: false,
  data: {
    sourceHandles,
    ...data,
  },
}
