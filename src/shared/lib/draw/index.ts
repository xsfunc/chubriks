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
import { feMerge } from './effects/fe-merge'
import { feMorphology } from './effects/fe-morphology'
import { feComposite } from './effects/fe-composite'
import { formatInputId } from './effects/create-effect'
import { drawManager } from './model/draw-manager'
import { fillingApi } from './filling'
import { patternsApi } from './patterns'
import { deserializeGradients, serializeGradients } from './filling/gradients'
import {
  FE, feBlendMode,
  feColorMatrixVariant,
  feCompositeOperator,
  feDisplacementChannels,
  feMorphologyOperator,
  sourceIds,
  sourceIdsMap,
} from './effects/constants'
import { gradientTypes, gradientTypesMap, gradientTypesNames } from './filling/constants'

export * from './filling/types'
export * from './layers/head'
export { drawManager } from './model/draw-manager'
export { mouthPaths, eyesPaths } from './layers/face'
export { createPoline, polinePalette } from './filling/poline'

export const drawApi = {
  manager: drawManager,
  fillingTypes: fillingApi.types,
  defaultColors: fillingApi.defaultColorsIds,

  encodePatterns: patternsApi.encodePatterns,
  decodePatterns: patternsApi.decodePatterns,
  patternMap: PATTERN,
  patterns: {
    ...patternsApi,
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

  fe: {
    feDisplacementChannels,
    feColorMatrixVariant,
    morphologyOperator: feMorphologyOperator,
    compositeOperator: feCompositeOperator,
    blendMode: feBlendMode,
    formatInputId,
    sourceIdsMap,
    sourceIds,
  },
  effectMap: FE,
  effects: {
    feBlend,
    feBlur,
    feTurbulence,
    feDisplacement,
    feColorMatrix,
    feComposite,
    feComponentTransfer,
    feConvolveMatrix,
    feMerge,
    feFlood,
    feMorphology,
    feOffset,
  },

  gradients: {
    serializeGradients,
    deserializeGradients,
    types: gradientTypes,
    typesNames: gradientTypesNames,
    typesMap: gradientTypesMap,
  },
}
