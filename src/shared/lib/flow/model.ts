import { combine, createEvent, createStore, sample } from 'effector'
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import type { Edge, EdgeChange, Node, NodeChange } from 'reactflow'
import type { NodeDataUpdate, NodeId } from './types'
import { compositionDataFromRoot, getNodeById } from './lib'

const initNodesCalled = createEvent<Node[]>()
const initEdgesCalled = createEvent<Edge[]>()
const addEdgeCalled = createEvent<Edge>()
const addNodeCalled = createEvent<Node>()
const updateNodeDataCalled = createEvent<NodeDataUpdate>()
const updateNodeFilterCalled = createEvent()
const changeNodesCalled = createEvent<NodeChange[]>()
const changeEdgesCalled = createEvent<EdgeChange[]>()
const nodesInitialized = createEvent()
const edgesInitialized = createEvent()
const deleteNodeCalled = createEvent<NodeId>()
const deleteEdgesCalled = createEvent<Edge[]>()
const nodesDataUpdated = createEvent<Node[]>()
const edgesDataUpdated = createEvent<Edge[]>()

const $nodes = createStore<Node[]>([])
const $edges = createStore<Edge[]>([])
const $rootNodeId = createStore('result-node')
const $rootNode = combine($nodes, $rootNodeId, getNodeById)
const $nodesCompose = createStore({})

const $handles = createStore<Record<string, object>>({})
sample({
  clock: deleteNodeCalled,
  source: $handles,
  fn: (handles, nodeId) => {
    const { [nodeId]: _, ...withoutDeletedNode } = handles
    return withoutDeletedNode
  },
  target: $handles,
})

export const flowManager = {
  rootNode: $rootNode,
  nodes: $nodes,
  edges: $edges,
  nodesCompose: $nodesCompose,
  addNode: addNodeCalled,
  addEdge: addEdgeCalled,
  changeNodes: changeNodesCalled,
  changeEdges: changeEdgesCalled,
  deleteNode: deleteNodeCalled,
  deleteEdge: deleteEdgesCalled,
  updateNodeData: updateNodeDataCalled,
  updateNodeFilter: updateNodeFilterCalled,
  initNodes: initNodesCalled,
  initEdges: initEdgesCalled,

  nodesInitialized,
  edgesInitialized,
  // nodesDataUpdate and edgeDataUpdate are special events
  // to indicate when need to redraw result
  nodesDataUpdated,
  edgesDataUpdated,
}

sample({
  clock: initNodesCalled,
  target: [$nodes, nodesDataUpdated],
})
sample({
  clock: initEdgesCalled,
  target: [$edges, edgesDataUpdated],
})
sample({
  clock: addNodeCalled,
  source: $nodes,
  fn: (nodes, node) => [...nodes, node],
  target: [$nodes, nodesDataUpdated],
})
sample({
  clock: addEdgeCalled,
  source: $edges,
  fn: (edges, connection) => addEdge(connection, edges),
  target: [$edges, edgesDataUpdated],
})
sample({
  clock: deleteNodeCalled,
  source: $nodes,
  fn: (nodes, id) => nodes.filter(node => node.id !== id),
  target: [$nodes, nodesDataUpdated],
})
sample({
  clock: deleteEdgesCalled.map(edges => edges.map(edge => edge.id)),
  source: $edges,
  fn: (edges, edgesIdsToDelete) => edges.filter(edge => !edgesIdsToDelete.includes(edge.id)),
  target: [$edges, edgesDataUpdated],
})
sample({
  clock: updateNodeDataCalled,
  source: $nodes,
  fn: (nodes, { id, data }) => nodes.map(node =>
    node.id === id
      ? { ...node, data: { ...node.data, ...data } }
      : node,
  ),
  target: [$nodes, nodesDataUpdated],
})

sample({
  clock: changeNodesCalled,
  source: $nodes,
  fn: (nodes, changes) => applyNodeChanges(changes, nodes),
  target: $nodes,
})
sample({
  clock: changeEdgesCalled.map(filterRemoveChanges), // for removing used other event
  source: $edges,
  fn: (edges, changes) => applyEdgeChanges(changes, edges),
  target: $edges,
})

sample({
  clock: [
    nodesDataUpdated.map(nodes => ({ nodes })),
    edgesDataUpdated.map(edges => ({ edges })),
    // $rootNode.map(rootNode => ({ rootNode })),
  ],
  source: {
    rootNode: $rootNode,
    nodes: $nodes,
    edges: $edges,
  },
  filter: ({ rootNode }) => Boolean(rootNode),
  fn: ({ rootNode, nodes, edges }, data) => compositionDataFromRoot({ rootNode, nodes, edges, ...data }),
  target: $nodesCompose,
})

function filterRemoveChanges(changes: EdgeChange[]) {
  return changes.filter(change => change.type !== 'remove')
}
