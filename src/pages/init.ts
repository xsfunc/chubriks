import { createEvent, sample } from 'effector'
import { fxhashApi } from '@/shared/lib'
import { configApi } from '@/shared/config'
import '@/features/draw-canvas'

const fxInitialOptions: FxInitOptions = {
  features: {},
  params: [
    {
      id: 'config',
      name: 'Config bytes',
      type: 'bytes',
      default: configApi.uint8EncodedConfig,
      update: 'code-driven',
      options: {
        length: 512,
      },
    },
    {
      id: 'effects',
      name: 'Effects bytes',
      type: 'bytes',
      default: configApi.uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 512,
      },
    },
    {
      id: 'patterns',
      name: 'Patterns bytes',
      type: 'bytes',
      default: configApi.uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 512,
      },
    },
    {
      id: 'gradients',
      name: 'Gradients bytes',
      type: 'bytes',
      default: configApi.uint8EncodedArray,
      update: 'code-driven',
      options: {
        length: 512,
      },
    },
  ],
}

export const appStarted = createEvent()

sample({
  clock: appStarted,
  fn: () => fxInitialOptions,
  target: fxhashApi.manager.init,
})
