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
import { feBlur } from './effects/fe-blur'
import { feBlend } from './effects/fe-blend'
import { feTurbulence } from './effects/fe-turbulence'
import { feFlood } from './effects/fe-flood'
import { feOffset } from './effects/fe-offset'
import { feColorMatrix } from './effects/fe-color-matrix'
import { feConvolveMatrix } from './effects/fe-convolve-matrix'
import { feComponentTransfer } from './effects/fe-component-transfer'
import { feDisplacement } from './effects/fe-displacement'

import { drawManager } from './model/draw-manager'
import { fillingApi } from './filling'
import { patternsApi } from './patterns'
import { FE } from './effects/constants'

export * from './layers/head'
export { drawManager } from './model/draw-manager'
export { eyeVariants, noseVariants, mouthVariants } from './layers/face'
export { createPoline, polinePalette } from './filling/poline'

export const drawApi = {
  manager: drawManager,
  fillingTypes: fillingApi.types,

  encodePatterns: patternsApi.encodePatterns,
  decodePatterns: patternsApi.decodePatterns,
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
  effectMap: FE,
  effects: {
    feBlend,
    feBlur,
    feDisplacement,
    feFlood,
    feOffset,
    feColorMatrix,
    feConvolveMatrix,
    feComponentTransfer,
    feTurbulence,
  },
}
