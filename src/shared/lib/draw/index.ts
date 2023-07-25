import { waves } from './patterns/pattern-waves'
import { cross } from './patterns/pattern-cross'
import { herringbone } from './patterns/pattern-herringbone'
import { PATTERN } from './patterns/pattern'

export * from './layers/head'

export { drawManager } from './model/draw-manager'
export { eyeVariants, noseVariants, mouthVariants } from './layers/face'
export { createPoline, polinePalette } from './palette/poline'

export const drawApi = {
  patternMap: PATTERN,
  patterns: {
    waves,
    cross,
    herringbone,
  },
}
