export function getNodeFilters(nodes, id) {
  const node = nodes.find(node => node.id === id)
  return node.data.filters
}

export function updateNodeFilter(filters, filterId, updateData) {
  const index = filters.findIndex(({ id }) => id === filterId)
  if (index === -1)
    return filters
  filters[index] = { ...filters[index], ...updateData }
  return filters
}
