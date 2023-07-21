import type { Edge } from 'reactflow'

export function filterSameTarget(connection: Edge) {
  return (edge: Edge) =>
    !(edge.target === connection.target && edge.targetHandle === connection.targetHandle)
}
