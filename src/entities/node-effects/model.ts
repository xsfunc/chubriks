import { createEvent, sample } from 'effector'
import { flowManager } from '../flow-manager'
import type { CssFilter } from '@/entities/node-result/model/types'

interface UpdateFilterProps {
  data: object
  filters: CssFilter[]
  filtersType: 'cssFilters'
  filterId: string
  nodeId: string
}

const updateFilterCalled = createEvent<UpdateFilterProps>()

sample({
  clock: updateFilterCalled,
  fn: updateFilter,
  target: flowManager.updateNode,
})

export const model = {
  updateFilter: updateFilterCalled,
}

function updateFilter({ filters, filtersType, data, nodeId, filterId }: UpdateFilterProps) {
  const updatedFilters = filters.map(filter =>
    filter.id === filterId
      ? { ...filter, data: { ...filter.data, ...data } }
      : filter)

  return {
    id: nodeId,
    data: { [filtersType]: updatedFilters },
  }
}
