import { createStore, sample } from 'effector'

type Effect = object

const $nodeEffects = createStore<{ [id: string]: Effect[] }>

sample({
  clock: filter,
})

const raw = {
  effects: [{
    id: 1,
    type: 'blur',
    data: { x: 0, y: 0 },
  }],
  head: {
    effects: [1],
  },
}
