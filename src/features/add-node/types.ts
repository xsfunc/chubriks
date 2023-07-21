type NodesToBeAdded = 'faceNode' | 'patternNode' | 'effectsNode'

export interface AddNodeParams {
  nodeType: NodesToBeAdded
  event: MouseEvent
}
export interface AddNodeFxParams {
  nodeType: NodesToBeAdded
  position: {
    x: number
    y: number
  }
}
