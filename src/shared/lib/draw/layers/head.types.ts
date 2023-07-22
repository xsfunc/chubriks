import type { FillingProps } from '../types'
import type { EyesProps } from './eyes.types'
import type { MouthProps } from './mouth.types'
import type { NoseProps } from './nose.types'

export interface HeadProps {
  fill: FillingProps
  stroke: FillingProps
  strokeWidth: number
  width: number
  height: number
  radius: number
  effects: string[]
  eyes: boolean
  nose: boolean
  mouth: boolean
}
export interface FaceProps {
  eyes: EyesProps
  nose: NoseProps
  mouth: MouthProps
}
