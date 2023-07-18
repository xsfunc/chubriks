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
      eyes: {
        accept: ['eyes'],
        isConnectable: true,
      },
      nose: {
        accept: ['nose'],
        isConnectable: true,
      },
      mouth: {
        accept: ['mouth'],
        isConnectable: true,
      },
      stroke: {
        accept: ['color', 'pattern'],
        isConnectable: true,
      },
      fill: {
        accept: ['color', 'pattern'],
        isConnectable: true,
      },
    },

    prop: 'head',
    fill: {
      type: 'color',
      color: '#ffffff',
    },
    stroke: {
      type: 'color',
      color: '#000000',
    },
    width: 500,
    height: 633,
    strokeWidth: 15,
    radius: 50,
    effects: {
      svgFilters: [],
      cssFilters: [],
    },
  },
}
