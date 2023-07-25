import { cssDropShadow } from './css-drop-shadow'
import { EFFECT } from './effect'
import { svgBlur } from './svg-blur'
import type { EffectOptions } from './types'

export function createEffect(options: EffectOptions) {
  const effectsFnMap = {
    [EFFECT.BLUR]: svgBlur.add,
    [EFFECT.DROP_SHADOW]: cssDropShadow.add,
  } as const

  const effectFn = effectsFnMap[options.type]
  return effectFn(options)
}
