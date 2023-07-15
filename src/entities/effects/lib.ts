import { nanoid } from 'nanoid'

export const svgBlurEffectDefault = {
  name: 'Blur',
  id: nanoid(),
  type: 'svg-blur',
  data: {
    x: 3,
    y: 3,
  },
}

export function toNodeEffects(effects: any[]) {
  const nodeIdsArray = effects.map(effect => effect.nodeId)
  const uniqNodeIds = [...new Set(nodeIdsArray)]
  return uniqNodeIds.reduce((map, nodeId) => {
    const effectsByNode = effects.filter(effect => effect.nodeId === nodeId)
    return { ...map, [nodeId as string]: effectsByNode }
  }, {})
}
