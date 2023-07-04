// export function getNodeFilters(nodes: Node[], id: string) {
//   const node = nodes.find(node => node.id === id)
//   if (node)
//     return node.data.filters

//   // empty filter list if node has not been found
//   return []
// }

// export function updateNodeFilter(filters, filterId, updateData) {
//   const index = filters.findIndex(({ id }) => id === filterId)
//   if (index === -1)
//     return filters
//   filters[index] = { ...filters[index], ...updateData }
//   return filters
// }
