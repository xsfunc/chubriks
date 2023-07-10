import { getConnectedEdges, getIncomers } from 'reactflow'
import { layers } from './layers'
import type { ColorProps, CompositionFromNodeProps, DrawProps, PatternProps } from './types'
import { wave1Pattern } from './patterns/pattern-wave-1'

export function drawFace({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  layers.drawBackground({ canvas, composition })
  layers.drawHead({ canvas, composition })
  layers.drawEyes({ canvas, composition })
  layers.drawNose({ canvas, composition })
  layers.drawMouth({ canvas, composition })
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
      const { targetHandle } = edge
      const childDataClone = { ...childData }
      // remove useless params
      delete childDataClone.sourceHandles
      delete childDataClone.targetHandles
      delete childDataClone.prop
      data = { ...data, [targetHandle as string]: childDataClone }
    }
  }

  return data
}

export function getPaint(paintProps: ColorProps | PatternProps) {
  const paintTypes = {
    color: (paintProps as ColorProps).color,
    pattern: wave1Pattern((paintProps as PatternProps)),
  }
  return paintTypes[paintProps.type]
}
