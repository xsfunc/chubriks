import { combine, createEvent, createStore, sample } from 'effector'
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import type { Edge, EdgeChange, Node, NodeChange } from 'reactflow'
import type { EdgeId, NodeDataUpdate, NodeId } from './types'
import { getNodeById } from './lib'

const initNodesCalled = createEvent<Node[]>()
const addEdgeCalled = createEvent<Edge>()
const addNodeCalled = createEvent<Node>()
const updateNodeDataCalled = createEvent<NodeDataUpdate>()
const updateNodeFilterCalled = createEvent()
const changeNodesCalled = createEvent<NodeChange[]>()
const changeEdgesCalled = createEvent<EdgeChange[]>()
const nodesInitialized = createEvent()
const nodeDataUpdated = createEvent<Node[]>()
const deleteNodeCalled = createEvent<NodeId>()
const deleteEdgeCalled = createEvent<EdgeId>()

const $nodes = createStore<Node[]>([])
const $edges = createStore<Edge[]>([])
const $rootNodeId = createStore('result-node')
const $rootNode = combine($nodes, $rootNodeId, getNodeById)

export const flowManager = {
  rootNode: $rootNode,
  nodes: $nodes,
  edges: $edges,
  addNode: addNodeCalled,
  addEdge: addEdgeCalled,
  changeNodes: changeNodesCalled,
  changeEdges: changeEdgesCalled,
  deleteNode: deleteNodeCalled,
  deleteEdge: deleteEdgeCalled,
  updateNodeData: updateNodeDataCalled,
  updateNodeFilter: updateNodeFilterCalled,
  initNodes: initNodesCalled,

  nodesInitialized,
  nodeDataUpdated,
}

sample({
  clock: initNodesCalled,
  target: [$nodes, nodesInitialized],
})

sample({
  clock: addNodeCalled,
  source: $nodes,
  fn: (nodes, node) => [...nodes, node],
  target: $nodes,
})
sample({
  clock: addEdgeCalled,
  source: $edges,
  fn: (edges, params) => addEdge(params, edges),
  target: $edges,
})

sample({
  clock: deleteNodeCalled,
  source: {
    nodes: $nodes,
  },
  fn: ({ nodes }, id) => nodes.filter(node => node.id !== id),
  target: [$nodes, nodeDataUpdated],
})
sample({
  clock: deleteEdgeCalled,
  source: {
    edges: $edges,
  },
  fn: ({ edges }, id) => edges.filter(edge => edge.id !== id),
  target: [$edges, nodeDataUpdated],
})

sample({
  clock: changeNodesCalled,
  source: $nodes,
  fn: (nodes, changes) => applyNodeChanges(changes, nodes),
  target: $nodes,
})
sample({
  clock: changeEdgesCalled,
  source: $edges,
  fn: (edges, changes) => applyEdgeChanges(changes, edges),
  target: $edges,
})

sample({
  clock: updateNodeDataCalled,
  source: $nodes,
  fn: (nodes, { id, data }) => nodes.map(node =>
    node.id === id
      ? { ...node, data: { ...node.data, ...data } }
      : node,
  ),
  target: [$nodes, nodeDataUpdated],
})

// sample({
//   clock: drawCalled,
//   fn: compositionDataFromRoot,
//   target: $compositionData,
// })
