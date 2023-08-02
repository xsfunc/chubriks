import { SVG } from '@svgdotjs/svg.js'
import { type GradientOptions } from '@/shared/lib'

export function addCanvas(gradientOptions: GradientOptions, palette: string[]) {
  const generateSvgGradient = (type: string) => {
    const container = SVG()
    const { stops, colors } = gradientOptions
    const gradient = container.gradient(type)
    for (let i = 0; i < stops.length; i++) {
      const colorId = colors[i]
      const color = palette[colorId]
      gradient.stop(stops[i] / 100, color)
    }

    return container
      .rect(100, 100)
      .fill(gradient)
      .radius(8)
      .parent()
  }

  return {
    linear: generateSvgGradient('linear'),
    radial: generateSvgGradient('radial'),
  }
}
