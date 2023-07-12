import { getConnectedEdges, getIncomers } from 'reactflow'
import { layers } from './layers'
import type { ColorProps, CompositionFromNodeProps, DrawProps, PatternProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'

export function drawFace({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  layers.drawBackground({ canvas, composition })
  layers.drawHead({ canvas, composition })
  layers.drawEyes({ canvas, composition })
  layers.drawNose({ canvas, composition })
  layers.drawMouth({ canvas, composition })
}

export function getFilling(fillingProps: ColorProps | PatternProps) {
  if (fillingProps.type === 'color')
    return fillingProps.color
  if (fillingProps.type === 'pattern')
    return paintPatternByType(fillingProps)
}

export function compositionDataFromRoot({ rootNode, nodes, edges }: CompositionFromNodeProps) {
  const incomers = getIncomers(rootNode, nodes, edges)
  let data = { ...rootNode.data }

  // recursive traversal of child nodes
  for (const node of incomers) {
    const childData = compositionDataFromRoot({ rootNode: node, nodes, edges })
    // get edges to find connection handle id
    const connectedEdges = getConnectedEdges([rootNode], edges)
    const connectedToCurrentNodeEdges = connectedEdges.filter(edge => edge.source === node.id)

    for (const edge of connectedToCurrentNodeEdges) {
      const { sourceHandle, targetHandle } = edge

      let childDataClone
      if (sourceHandle === 'main') {
        childDataClone = { ...childData }
        // remove useless params
        delete childDataClone.sourceHandles
        delete childDataClone.targetHandles
        delete childDataClone.prop
      }
      else {
        childDataClone = cloned(childData[sourceHandle as string])
      }
      data = { ...data, [targetHandle as string]: childDataClone }
    }
  }
  return data
}

function cloned(data: object | object[]) {
  return Array.isArray(data) ? [...data] : { ...data }
}
