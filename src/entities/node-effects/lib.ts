import { nanoid } from 'nanoid'
import type { EffectsNode, UpdateEffectProps } from './types'

export function updateEffect({ effects, effectId, nodeId, data }: UpdateEffectProps) {
  const updatedEffects = effects.map(effect =>
    effect.id === effectId
      ? { ...effect, ...data }
      : effect)

  return {
    id: nodeId,
    data: { effects: updatedEffects },
  }
}

export const effectsDefault: EffectsNode = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 444, y: 900 },
  data: {
    effects: [],
  },
}

export const effectsNodeDefault: EffectsNode = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 141, y: 586 },
  data: {
    effects: [],
  },
}

const css = [
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
]
