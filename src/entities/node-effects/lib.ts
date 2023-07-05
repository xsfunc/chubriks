import type { UpdateFilterProps } from './model/types'

export function updateFilter({ filters, filtersType, data, nodeId, filterId }: UpdateFilterProps) {
  const updatedFilters = filters.map(filter =>
    filter.id === filterId
      ? { ...filter, data: { ...filter.data, ...data } }
      : filter)

  return {
    id: nodeId,
    data: { [filtersType]: updatedFilters },
  }
}
