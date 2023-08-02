import { createEvent, createStore, sample } from 'effector'
import type { HeadProps } from '@/shared/lib'
import { configApi } from '@/shared/config'

const headUpdated = createEvent<Partial<HeadProps>>()

const $head = createStore(configApi.defaultConfigParam.head)

sample({
  clock: headUpdated,
  source: $head,
  fn: (head, payload) => ({ ...head, payload }),
  target: $head,
})

export const headModel = {
  head: $head,
  updateHead: headUpdated,
}
