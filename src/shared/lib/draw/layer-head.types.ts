export interface HeadProps {
  fill: string
  stroke: string
  strokeWidth: number
  width: number
  height: number
  radius: number
  effects: EffectsProps
  eyes?: EyesProps
  nose?: NoseProps
  mouth?: MouthProps
  filters?: SvgFilter[]
  pattern?: PatternProps
}
