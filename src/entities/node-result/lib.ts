import type { ResultNode } from './types'

export const resultNodeDefault: ResultNode = {
  id: 'result-node',
  deletable: false,
  type: 'resultNode',
  position: { x: 895, y: 120 },
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
      effects: {
        isConnectable: true,
        accept: ['effects'],
      },
    },
    background: {
      type: 'color',
      color: '#cccccc',
    },
    effects: [],
  },
}
