import { svgBlur } from './svg-blur'
import type { EffectOptions, EffectsFnMap } from './types'

export const effectsList = ['svg-blur'] as const

const effectsFnMap: EffectsFnMap = {
  'svg-blur': svgBlur,
}

export function createEffect(options: EffectOptions) {
  const effectFn = effectsFnMap[options.type]
  return effectFn(options)
}
