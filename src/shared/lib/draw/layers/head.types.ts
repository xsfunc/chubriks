import type { EffectsProps, PaintProps } from '../types'
import type { EyesProps } from './eyes.types'
import type { MouthProps } from './mouth.types'
import type { NoseProps } from './nose.types'

export interface HeadProps {
  fill: PaintProps
  stroke: PaintProps
  strokeWidth: number
  width: number
  height: number
  radius: number
  effects: EffectsProps
  eyes?: EyesProps
  nose?: NoseProps
  mouth?: MouthProps
  // filters?: SvgFilter[]
  // pattern?: PatternProps
}
