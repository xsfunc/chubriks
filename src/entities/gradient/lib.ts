import { SVG } from '@svgdotjs/svg.js'
import { type GradientOptions } from '@/shared/lib'
import { configApi } from '@/shared/config'

export function generateGradientOptions(id: number): GradientOptions {
  const paletteIds = Array.from({ length: configApi.palette.numberPoints }, (_, i) => i)
  const colorsCount = randomInt(2, 4)
  return {
    id,
    type: randomInt(0, 1) as (0 | 1),
    degree: randomInt(0, 360),
    colors: getRandomSubarray(paletteIds, colorsCount),
    stops: getRandomArray(colorsCount),
  }
}

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

    if (type === 'linear') {
      const { x1, x2, y1, y2 } = angleToCoordinates(gradientOptions.degree)
      gradient.from(x1, y1).to(x2, y2)
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

function angleToCoordinates(angleInDegrees: number, sizeOfSquare = 1) {
  let constrainedAngle = angleInDegrees % 360
  if (constrainedAngle < 0)
    constrainedAngle += 360

  const angleBetween0and45deg = constrainedAngle % 45
  const angle45InRadians = Math.PI / 180 * angleBetween0and45deg
  const delta = 1 / Math.cos(angle45InRadians) * Math.sin(angle45InRadians)

  const angleUnder180 = constrainedAngle % 180
  const xBase = delta
  const yBase = 1

  let x1
  let y1

  if (angleUnder180 < 45) {
    x1 = xBase // x ranges from 0 to 1
    y1 = yBase // y is always 1
  }
  else if (angleUnder180 < 90) {
    x1 = yBase // x is always 1
    y1 = 1 - xBase // y ranges from 1 to 0
  }
  else if (angleUnder180 < 135) {
    x1 = yBase // x is always 1
    y1 = -xBase // y ranges from 0 to -1
  }
  else if (angleUnder180 < 180) {
    x1 = 1 - xBase // x ranges from 1 to 0
    y1 = -yBase // y is always -1
  }

  if (constrainedAngle < 180) {
    x1 = -x1
    y1 = -y1
  }

  // The other coordinates of the line are just the inverse of the coordinates we already have found.
  let x2 = -x1
  let y2 = -y1

  // This converts the -1/1 to 1/-1 coordinate system to the 0/0 to 1/1 coordinate system, and
  // multiplies the coordinates by the size of the square given by the user.
  x1 = (x1 + 1) / 2 * sizeOfSquare
  y1 = (-y1 + 1) / 2 * sizeOfSquare
  x2 = (x2 + 1) / 2 * sizeOfSquare
  y2 = (-y2 + 1) / 2 * sizeOfSquare

  return { x1, y1, x2, y2 }
}

export function randomInt(min: number, max: number) {
  const random = $fx.randminter
  return Math.floor(random() * (max - min + 1) + min)
}

export function getRandomArray(size: number) {
  const array = [0, 100]
  while (array.length < size)
    array.push(randomInt(10, 90))
  return array.sort((a, b) => a - b)
}

export function getRandomSubarray(arr: number[], size: number) {
  const random = $fx.randminter
  const shuffled = arr.slice(0)
  let i = arr.length
  const min = i - size
  let temp
  let index
  while (i-- > min) {
    index = Math.floor((i + 1) * random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}
