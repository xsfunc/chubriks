import { createEvent, createStore, sample } from 'effector'
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import { svg } from '../../node-result/model'
import { initialNodes } from './initialNodes'

const debugCalled = createEvent()
const initCalled = createEvent()
const addEdgeCalled = createEvent()
const addNodeCalled = createEvent()
const updateNodeCalled = createEvent()
const updateNodeFilterCalled = createEvent()
const changeNodesCalled = createEvent()
const changeEdgesCalled = createEvent()
const $nodes = createStore(initialNodes)
const $edges = createStore([])
const $debug = createStore(null)
const $rootNodeId = createStore('result-node')

export const flowManager = {
  nodes: $nodes,
  edges: $edges,
  debugMessage: $debug,
  debug: debugCalled,
  addNode: addNodeCalled,
  addEdge: addEdgeCalled,
  changeNodes: changeNodesCalled,
  changeEdges: changeEdgesCalled,
  updateNode: updateNodeCalled,
  updateNodeFilter: updateNodeFilterCalled,
  init: initCalled,
}

sample({
  clock: addNodeCalled,
  source: $nodes,
  fn: (node, nodes) => [...nodes, node],
  target: $nodes,
})
sample({
  clock: addEdgeCalled,
  source: $edges,
  fn: (edges, params) => addEdge(params, edges),
  target: $edges,
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
  clock: updateNodeCalled,
  source: $nodes,
  fn: (nodes, { id, data }) => nodes.map(node =>
    node.id === id
      ? { ...node, data: { ...node.data, ...data } }
      : node,
  ),
  target: $nodes,
})

sample({
  source: {
    nodes: $nodes,
    edges: $edges,
    rootNodeId: $rootNodeId,
  },
  fn({ nodes, edges, rootNodeId }) {
    const rootNode = nodes.find(node => node.id === rootNodeId)
    return { rootNode, nodes, edges }
  },
  target: svg.syncComposition,
})

export * from './initialNodes'
