import { createEffect, createEvent, createStore, sample } from 'effector'
import { nanoid } from 'nanoid'
import { flowManager } from '@/shared/lib'
import { patternNodeDefault } from '@/entities/node-pattern'
import { effectsNodeDefault } from '@/entities/node-effects'

const defaultNodes = {
  pattern: patternNodeDefault,
  effects: effectsNodeDefault,
  // eyes: eyesNodeDefault
}

const $menuOpen = createStore(false)
const openMenuCalled = createEvent()
const closeMenuCalled = createEvent()

const addNodeCalled = createEvent()
const addNodeFx = createEffect(({ nodes, nodeType, position }) => {
  const id = nanoid(5)
  const node = { ...defaultNodes[nodeType], id, position }
  return [...nodes, node]
})

export const model = {
  addNode: addNodeCalled,
  menuOpen: $menuOpen,
  openMenu: openMenuCalled,
  closeMenu: closeMenuCalled,
}

sample({
  clock: openMenuCalled,
  fn: () => true,
  target: $menuOpen,
})
sample({
  clock: closeMenuCalled,
  fn: () => false,
  target: $menuOpen,
})

sample({
  clock: addNodeCalled,
  source: {
    nodes: flowManager.nodes,
  },
  fn: ({ nodes }, { nodeType, event }) => ({
    position: { x: event.clientX, y: event.clientY - 100 },
    nodeType,
    nodes,
  }),
  target: [addNodeFx, model.closeMenu],
})
sample({
  clock: addNodeFx.doneData,
  target: flowManager.nodes,
})
