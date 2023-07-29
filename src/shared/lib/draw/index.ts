import { waves } from './patterns/pattern-waves'
import { cross } from './patterns/pattern-cross'
import { herringbone } from './patterns/pattern-herringbone'
import { lines } from './patterns/pattern-lines'
import { PATTERN } from './patterns/constants'
import { EFFECT } from './effects/effect'
import { svgBlur } from './effects/svg-blur'
import { svgTurbulence } from './effects/svg-turbulence'
import { svgConvolveMatrix } from './effects/svg-convolve-matrix'
import { svgDisplacementMap } from './effects/svg-displacement'
import { cssDropShadow } from './effects/css-drop-shadow'
import { cssGrayscale } from './effects/css-grayscale'
import { cssInvert } from './effects/css-invert'
import { cssSepia } from './effects/css-sepia'
import { cssOpacity } from './effects/css-opacity'
import { drawManager } from './model/draw-manager'

export * from './layers/head'

export { drawManager } from './model/draw-manager'
export { eyeVariants, noseVariants, mouthVariants } from './layers/face'
export { createPoline, polinePalette } from './filling/poline'

export const drawApi = {
  manager: drawManager,

  patternMap: PATTERN,
  patterns: {
    waves,
    cross,
    herringbone,
    lines,
  },
  effectMap: EFFECT,
  effects: {
    svgBlur,
    svgTurbulence,
    svgConvolveMatrix,
    svgDisplacementMap,
    cssDropShadow,
    cssGrayscale,
    cssInvert,
    cssSepia,
    cssOpacity,
  },
}
