import type { HeadNode } from './types'

export const headNodeDefault: HeadNode = {
  id: 'head-node',
  type: 'headNode',
  position: { x: 697, y: 331 },
  data: {
    sourceHandles: {
      main: {
        type: 'head',
      },
    },
    targetHandles: {
      eyes: { accept: ['eyes'] },
      nose: { accept: ['nose'] },
      mouth: { accept: ['mouth'] },
      stroke: { accept: ['color', 'pattern'] },
      fill: { accept: ['color', 'pattern'] },
      strokeEffects: { accept: ['effects'] },
      effects: { accept: ['effects'] },
    },

    fill: {
      type: 'color',
      color: 'gray',
    },
    stroke: {
      type: 'color',
      color: 'black',
    },
    width: 500,
    height: 633,
    strokeWidth: 15,
    radius: 50,
    eyes: false,
    nose: false,
    mouth: false,
    strokeEffects: [],
    effects: [],
  },
}
