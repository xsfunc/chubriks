import type { ResultNode } from './types'

export const resultNodeDefault: ResultNode = {
  id: 'result-node',
  deletable: false,
  type: 'resultNode',
  position: { x: 693, y: 72 },
  data: {
    targetHandles: {
      head: {
        accept: ['head'],
        isConnectable: true,
      },
      background: {
        isConnectable: true,
        accept: ['color', 'pattern'],
      },
    },
    background: {
      type: 'color',
      color: '#cccccc',
    },
  },
}
