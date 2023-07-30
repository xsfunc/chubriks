import { waves } from './patterns/pattern-waves'
import { cross } from './patterns/pattern-cross'
import { herringbone } from './patterns/pattern-herringbone'
import { lines } from './patterns/pattern-lines'
import { flower } from './patterns/pattern-flower'
import { plus } from './patterns/pattern-plus'
import { circles } from './patterns/pattern-circles'
import { newPattern } from './patterns/pattern-new'
import { plaid } from './patterns/pattern-plaid'
import { squares } from './patterns/pattern-squares'
import { PATTERN } from './patterns/constants'
import { EFFECT } from './effects/effect'
import { svgBlur } from './effects/fe-blur'
import { svgTurbulence } from './effects/fe-turbulence'
import { svgConvolveMatrix } from './effects/fe-convolve-matrix'
import { svgDisplacementMap } from './effects/fe-displacement'
import { cssDropShadow } from './effects/css-drop-shadow'
import { cssGrayscale } from './effects/css-grayscale'
import { cssInvert } from './effects/css-invert'
import { cssSepia } from './effects/css-sepia'
import { cssOpacity } from './effects/css-opacity'
import { drawManager } from './model/draw-manager'
import { fillingApi } from './filling'

export * from './layers/head'
export { drawManager } from './model/draw-manager'
export { eyeVariants, noseVariants, mouthVariants } from './layers/face'
export { createPoline, polinePalette } from './filling/poline'

export const drawApi = {
  manager: drawManager,
  fillingTypes: fillingApi.types,

  patternMap: PATTERN,
  patterns: {
    waves,
    cross,
    herringbone,
    lines,
    flower,
    plus,
    circles,
    newPattern,
    plaid,
    squares,
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
