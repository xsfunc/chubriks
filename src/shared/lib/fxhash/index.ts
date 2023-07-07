import { createStore } from 'effector'
import { debug } from 'patronum'

const $context = createStore($fx.context)

export const fxManager = {
  context: $context,
}

export const fxhash = {
  init: () => {
    $fx.features({
      someFeature: 'ok',
      anotherFuture: 2,
    })

    $fx.params([
      {
        id: 'r',
        name: 'Result',
        type: 'number',
        default: 0,
        update: 'code-driven',
      },
      {
        id: 'head',
        name: 'Head',
        type: 'number',
        default: 1,
        update: 'code-driven',
      },
    ])
  },
}

debug(fxManager)
