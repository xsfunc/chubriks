import { nanoid } from 'nanoid'
import type { EffectsNode, UpdateFilterProps } from './types'

export function updateFilter({ filters, filtersType, data, nodeId, filterId }: UpdateFilterProps) {
  const updatedFilters = filters.map(filter =>
    filter.id === filterId
      ? { ...filter, data: { ...filter.data, ...data } }
      : filter)

  return {
    id: nodeId,
    data: { [filtersType]: updatedFilters },
  }
}

export const blurEffectDefault: EffectsNode = {
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
    cssFilters: [],
  },
}

export const effectsNodeDefault: EffectsNode = {
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
