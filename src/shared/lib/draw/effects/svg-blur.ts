export function svgBlur(options: SvgBlurEffectOptions) {
  return add => add.gaussianBlur(options.data.x, options.data.y)
}

export interface SvgBlurEffectOptions {
  type: 'svg-blur'
  x: number
  y: number
}
