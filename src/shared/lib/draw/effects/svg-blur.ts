export function svgBlur(options: SvgBlurEffectOptions) {
  return add => add.gaussianBlur(options.x, options.y)
}

export interface SvgBlurEffectOptions {
  type: 'svg-blur'
  x: number
  y: number
}
