import { createEvent, createStore, sample } from 'effector'
import { nanoid } from 'nanoid'
import { addEdge, applyEdgeChanges, applyNodeChanges, getIncomers } from 'reactflow'
import { debug } from 'patronum'
import { svg } from '../node-result/model'
import { getNodeFilters, updateNodeFilter } from './methods'

export const initialNodes = [
  {
    id: 'debug',
    type: 'debugNode',
    position: {
      x: 100, y: 200,
    },
  },
  {
    id: 'filters-node',
    type: 'filtersNode',
    position: { x: 207, y: 320 },
    data: {
      prop: 'effects',
      filters: [{
        id: nanoid(),
        type: 'blur',
        data: {
          amount: 5,
        },
      }],
    },
  },
  {
    id: 'face-node',
    type: 'headNode',
    position: { x: 457, y: 320 },
    data: {
      prop: 'face',
      fill: '#ffffff',
      stroke: '#000000',
      width: 500,
      height: 633,
      strokeWidth: 3,
      radius: 50,
    },
  },
  {
    id: 'eyes-node',
    type: 'eyesNode',
    position: { x: 458, y: 164 },
    data: {
      prop: 'eyes',
      fill: '#000000',
      size: 50,
      radius: 5,
    },
  },
  {
    id: 'result-node',
    type: 'resultNode',
    position: { x: 693, y: 72 },
    data: {},
  },
]

const $nodes = createStore(initialNodes)
const $edges = createStore([])
const $debug = createStore(null)
const $rootNodeId = createStore('result-node')

const debugCalled = createEvent()
const initCalled = createEvent()
const addEdgeCalled = createEvent()
const addNodeCalled = createEvent()
const updateNodeCalled = createEvent()
const updateNodeFilterCalled = createEvent()
const changeNodesCalled = createEvent()
const changeEdgesCalled = createEvent()

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
  clock: updateNodeFilterCalled,
  source: $nodes,
  fn(nodes, payload) {
    const { nodeId, filterId, data } = payload
    const filters = getNodeFilters(nodes, nodeId)
    const updatedFilters = updateNodeFilter(filters, filterId, { data })
    return {
      data: { filters: updatedFilters },
      id: nodeId,
    }
  },
  target: updateNodeCalled,
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
// sample({
//   clock: updateNodeCalled,
//   source: {
//     nodes: $nodes,
//     edges: $edges,
//   },
//   filter({ nodes, edges }, { id }) {
//     const node = nodes.find(node => node.id === id)
//     if (node === undefined)
//       return false

//     const out = getOutgoers(node, nodes, edges)
//     return out.length > 0
//   },
//   fn({ nodes, edges }, { id, data }) {
//     const node = nodes.find(node => node.id === id)
//     if (node === undefined)
//       return false

//     const [outNode] = getOutgoers(node, nodes, edges)
//     return { id: outNode.id, data }
//   },
//   target: updateNodeCalled,
// })

sample({
  clock: debugCalled,
  source: {
    nodes: $nodes,
    edges: $edges,
  },
  fn({ nodes, edges }) {
    const node = nodes.find(node => node.id === 'result-node')
    if (node === undefined)
      return false

    const out = getIncomers(node, nodes, edges)
    return out
  },
  target: $debug,
})

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

debug({ $nodes })
