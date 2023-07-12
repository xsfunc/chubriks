import { nanoid } from 'nanoid'
import type { EffectsNode, UpdateEffectProps } from './types'

export function updateFilter({ effects, effectId, nodeId, data }: UpdateEffectProps) {
  const updatedFilters = effects.map(effect =>
    effect.id === effectId
      ? { ...effect, ...data }
      : effect)

  return {
    id: nodeId,
    data: { effects: updatedFilters },
  }
}

export const blurEffectDefault: EffectsNode = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 141, y: 586 },
  data: {
    effects: [{
      id: nanoid(),
      type: 'svg-blur',
      x: 5,
      y: 10,
    }],
  },
}

export const effectsNodeDefault: EffectsNode = {
  id: 'effects-node',
  type: 'effectsNode',
  position: { x: 141, y: 586 },
  data: {
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
