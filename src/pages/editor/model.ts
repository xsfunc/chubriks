import { nanoid } from 'nanoid'
import type { Node } from 'reactflow'
import { debug } from 'patronum'
import { flowManager } from '@/shared/lib'
import type { EffectsNode, HeadNode, PaletteNode, PatternNode, ResultNode } from '@/entities/types'

import '@/features/update-canvas'

const headNode: HeadNode = {
  id: 'head-node',
  type: 'headNode',
  position: { x: 430, y: 210 },
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
    sourceHandles: {
      main: {
        type: 'pattern',
      },
    },

    type: 'pattern',
    prop: 'pattern',
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
    fill: '#000000',
    size: 50,
    variant: 1,
  },
}

const resultNode: ResultNode = {
  id: 'result-node',
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
const paletteNode: PaletteNode = {
  id: 'palette-node',
  type: 'paletteNode',
  position: { x: -100, y: 500 },
  data: {
    colorIds: ['red', 'orange'],
    red: {
      type: 'color',
      color: 'red',
    },
    orange: {
      type: 'color',
      color: 'orange',
    },
  },
}

export const initialNodes: Node[] = [
  headNode,
  effectsNode,
  patternNode,
  eyesNode,
  noseNode,
  mouthNode,
  paletteNode,
  resultNode,
]

flowManager.initNodes(initialNodes)

debug(flowManager.nodes)
