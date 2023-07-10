import chroma from 'chroma-js'
import type { ColorProps } from '@/shared/lib'

export function modulateColor(
  baseColor: { h: number; s: number; l: number },
  count = 5,
  hRange = 8,
  sRange = 8,
  lRange = 8,
): ColorProps[] {
  return Array(count).fill(1).map(() => {
    // pick a random number in a given range
    const random = (min: number, max: number) => Math.random() * (max - min) + min
    // add or subtract a random amount to each color property
    const h = baseColor.h + random(-hRange, hRange)
    const s = baseColor.s + random(-sRange, sRange)
    const l = baseColor.l + random(-lRange, lRange)
    // return a new color object
    return {
      type: 'color',
      color: chroma.hsl(h, s, l).hex(),
    }
  })
}
