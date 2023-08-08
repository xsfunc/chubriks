import type { ResultNode } from './types'

export const resultNodeDefault: ResultNode = {
  id: 'result-node',
  deletable: false,
  type: 'resultNode',
  position: { x: 979, y: 70 },
  data: {
    targetHandles: {
      head: {
        accept: ['head'],
      },
      back: {
        accept: ['back'],
      },
    },
  },
}
