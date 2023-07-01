import { createEvent, createStore, sample } from 'effector'
import { nanoid } from 'nanoid'

const defaultFilter = {
  id: nanoid(),
  type: 'blur',
  data: {
    amount: 5,
  },
}
const initialFilters = [defaultFilter]

const addFilterCalled = createEvent()
const updateFilterCalled = createEvent()

const $defaultFilter = createStore(defaultFilter)
const $filters = createStore(initialFilters)

sample({
  clock: addFilterCalled,
  source: {
    filters: $filters,
    newFilter: $defaultFilter,
  },
  fn: ({ filters, newFilter }) => [...filters, newFilter],
  target: $filters,
})
sample({
  clock: updateFilterCalled,
  source: $filters,
  fn(filters, { filterId, updateData }) {
    const index = filters.findIndex(({ id }) => id === filterId)
    if (index === -1)
      return filters
    filters[index] = { ...filters[index], ...updateData }
    return filters
  },
  target: $filters,
})

export const model = {
  filters: $filters,
  addFilter: addFilterCalled,
  updateNodeFilter: updateFilterCalled,
}
