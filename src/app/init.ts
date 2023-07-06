import { nanoid } from 'nanoid'
import type { Node } from 'reactflow'
import { flowManager, fxhash } from '@/shared/lib'
import type { EffectsNode, HeadNode } from '@/entities/types'

import '@/features/update-canvas'

fxhash.init()

const headNode: HeadNode = {
  id: 'head-node',
  type: 'headNode',
  position: { x: 457, y: 320 },
  data: {
    prop: 'face',
    fill: '#ffffff',
    stroke: '#000000',
    width: 500,
    height: 633,
    strokeWidth: 3,
    radius: 50,
    effects: {
      svgFilters: [],
      cssFilters: [],
    },
  },
}

const effectsNode: EffectsNode = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 207, y: 520 },
  data: {
    prop: 'effects',
    svgFilters: [{
      id: nanoid(),
      type: 'blur',
      data: {
        x: 5,
        y: 10,
      },
    }],
    cssFilters: [
      {
        id: nanoid(),
        type: 'dropShadow',
        data: {
          xOffset: 10,
          yOffset: 10,
          blurRadius: 10,
          color: '#000000',
        },
      },
      {
        id: nanoid(),
        type: 'grayscale',
        data: {
          amount: 0,
        },
      },
      {
        id: nanoid(),
        type: 'invert',
        data: {
          amount: 0,
        },
      },
      {
        id: nanoid(),
        type: 'hueRotate',
        data: {
          amount: 0,
        },
      },
      {
        id: nanoid(),
        type: 'sepia',
        data: {
          amount: 0,
        },
      },
    ],
  },
}

// TODO
const patternNode: Node = {
  id: nanoid(5),
  type: 'patternNode',
  position: { x: 400, y: 200 },
  data: {
    patternType: 'waves1',
    scale: 1,
    rotate: 0,
    strokeWidth: 1,
    backgroundColor: '#000000',
  },
}

// TODO
const eyesNode: Node = {
  id: 'eyes-node',
  type: 'eyesNode',
  position: { x: 458, y: 164 },
  data: {
    prop: 'eyes',
    fill: '#000000',
    size: 50,
    radius: 5,
  },
}

export const initialNodes: Node[] = [
  headNode,
  effectsNode,
  patternNode,
  eyesNode,
  {
    id: 'result-node',
    type: 'resultNode',
    position: { x: 693, y: 72 },
    data: {},
  },
]

flowManager.initNodes(initialNodes)
