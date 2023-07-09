import { nanoid } from 'nanoid'
import type { Node } from 'reactflow'
import { flowManager } from '@/shared/lib'
import type { EffectsNode, HeadNode, PatternNode } from '@/entities/types'

import '@/features/update-canvas'

const headNode: HeadNode = {
  id: 'head-node',
  type: 'headNode',
  position: { x: 430, y: 210 },
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
  position: { x: 141, y: 586 },
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

const patternNode: PatternNode = {
  id: nanoid(5),
  type: 'patternNode',
  position: { x: 700, y: 760 },
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
  position: { x: 150, y: 60 },
  data: {
    prop: 'eyes',
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}
const noseNode: Node = {
  id: 'nose-node',
  type: 'noseNode',
  position: { x: 150, y: 220 },
  data: {
    prop: 'nose',
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}
const mouthNode: Node = {
  id: 'mouth-node',
  type: 'mouthNode',
  position: { x: 150, y: 390 },
  data: {
    prop: 'mouth',
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}

export const initialNodes: Node[] = [
  headNode,
  effectsNode,
  patternNode,
  eyesNode,
  noseNode,
  mouthNode,
  {
    id: 'result-node',
    type: 'resultNode',
    position: { x: 693, y: 72 },
    data: {},
  },
]

flowManager.initNodes(initialNodes)
