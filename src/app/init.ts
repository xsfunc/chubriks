import { fxhash } from '@/shared/lib'

const defaultConfigParam = {
  palette: {
    seed: 0,
    hueShift: 10,
  },

  patterns: [],
  effects: [],

  head: {
    width: 10,
    height: 10,
    effectsIds: [],
  },
  back: {
    fill: {
      type: 'color',
      colorId: 0,
    },
    effectsIds: [],
  },
}

fxhash.init({
  features: {},
  params: [
    {
      id: 'config',
      name: 'Magic line',
      type: 'string',
      default: JSON.stringify(defaultConfigParam),
      update: 'code-driven',
      options: {
        minLength: 5,
        maxLength: 900,
      },
    },
  ],
})
