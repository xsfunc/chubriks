import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import type { Poline } from 'poline'
import { createPoline, fxhash, polinePalette } from '@/shared/lib'

const createPolineFx = createEffect(createPoline)

const initCalled = createEvent<void>()
const seedSet = createEvent<string>()
const hueShiftSet = createEvent<number>()

const $seed = createStore<number>(0)
const $hueShift = createStore<number>(0)
const $poline = createStore<Poline | null>(null)
const $palette = $poline.map(polinePalette)
const $paletteParam = combine(
  $seed, $hueShift,
  (seed, hueShift) => ({ seed, hueShift }),
)

sample({
  clock: $paletteParam,
  source: fxhash.configParam,
  fn: (config, palette) => ({ ...config, palette }),
  target: fxhash.updateConfigParam,
})
sample({
  clock: seedSet,
  filter: seed => Number(seed) < 256,
  fn: seed => Number(seed),
  target: $seed,
})
sample({
  clock: [initCalled, $hueShift],
  source: {
    seed: $seed,
    hueShift: $hueShift,
  },
  target: createPolineFx,
})
sample({
  clock: createPolineFx.doneData,
  target: $poline,
})
sample({
  clock: hueShiftSet,
  target: $hueShift,
})

export const paletteModel = {
  seed: $seed,
  setSeed: seedSet,
  hueShift: $hueShift,
  setHueShift: hueShiftSet,
  palette: $palette,
}

initCalled()
