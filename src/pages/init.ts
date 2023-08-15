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
      update: 'code-driven',
      type: 'bytes',
      default: configApi.configParamUint8Encoded,
      options: {
        length: configApi.configParamLength,
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
