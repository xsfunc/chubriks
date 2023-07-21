import { createEvent, sample } from 'effector'
import type { Edge } from 'reactflow'
import { addEdge } from 'reactflow'
import { filterSameTarget } from './lib'
import { flowManager } from '@/shared/lib'
import { getNodeById } from '@/shared/lib/flow/lib'
import type { CustomNode, SourceHandle, TargetHandle } from '@/shared/lib/flow/types'

export const addEdgeCalled = createEvent<Edge>()

sample({
  clock: addEdgeCalled,
  source: {
    edges: flowManager.edges,
    nodes: flowManager.nodes,
  },
  filter({ nodes }, connection) {
    const sourceNode = getNodeById(nodes, connection.source) as CustomNode
    const targetNode = getNodeById(nodes, connection.target) as CustomNode
    const sourceHandle = sourceNode.data.sourceHandles[connection.sourceHandle] as SourceHandle
    const targetHandle = targetNode.data.targetHandles[connection.targetHandle] as TargetHandle
    return targetHandle.accept.includes(sourceHandle.type)
  },
  fn({ edges }, connection) {
    // Remove existed connection if target handle already busy
    const notSameTarget = filterSameTarget(connection)
    const withoutSameTarget = edges.filter(notSameTarget)
    return addEdge(connection, withoutSameTarget)
  },
  target: [
    flowManager.edges,
    flowManager.edgesDataUpdated,
  ],
})
