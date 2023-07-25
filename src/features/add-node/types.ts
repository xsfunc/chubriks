type NodesToBeAdded = 'faceNode' | 'patternNode' | 'effectsNode'

export interface AddNodeParams {
  data: Node
  x: number
  y: number
}
export interface AddNodeFxParams {
  nodeType: NodesToBeAdded
  position: {
    x: number
    y: number
  }
}
