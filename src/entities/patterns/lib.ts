import type { PatternComponentMap } from '../node-pattern/types'
import { CrossPattern } from './ui/pattern-cross'
import { HerringbonePattern } from './ui/pattern-herringbone'
import { WavePattern } from './ui/pattern-wave'

export const patternsComponentsMap: PatternComponentMap = {
  waves: WavePattern,
  cross: CrossPattern,
  herringbone: HerringbonePattern,
}
