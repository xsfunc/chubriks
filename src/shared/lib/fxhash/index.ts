import { createEffect, createEvent, createStore, sample } from 'effector'
import { debug } from 'patronum'

const updateParamsCalled = createEvent<FxEmitData>()
const $context = createStore($fx.context)
const updateParamsFx = createEffect((data: FxEmitData) => $fx.emit('params:update', data))

sample({
  clock: updateParamsCalled,
  target: updateParamsFx,
})

export const fxManager = {
  context: $context,
  updateParams: updateParamsCalled,
}

export const fxhash = {
  init: () => {
    $fx.features({
      someFeature: 'ok',
      anotherFuture: 2,
    })

    $fx.params([
      {
        id: 'head',
        name: 'Head Params',
        type: 'number',
        default: 1,
        update: 'code-driven',
      },
      {
        id: 'eyes',
        name: 'Eyes Params',
        type: 'number',
        default: 1,
        update: 'code-driven',
      },
    ])
  },
}

debug(fxManager)
