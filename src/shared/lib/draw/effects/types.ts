import type { FE, feBlendMode, feColorMatrixVariant, feCompositeOperator, feMorphologyOperator } from './constants'

type Initial<T> = Omit<T, 'id'> & { name: string }
type FeId = number
type FeIn = null | string | number
type FeIn2 = null | string | number
type FeResult = null | string | number

export type FeType = typeof FE[keyof typeof FE]
export interface FeProcessor<T extends FeOptions, S extends FeSerialized> {
  initial: Initial<T>
  add: (options: T) => any
  serialize?: (options: T) => S
  deserialize?: (data: S) => T
}
export type FeInitial = Initial<FeOptions>
export type FeOptions = FeBlendOptions
| FeBlurOptions
| FeTurbulenceOptions
| FeDisplacementOptions
| FeColorMatrixOptions
| FeComponentTransferOptions
| FeCompositeOptions
| FeConvolveMatrixOptions
| FeMergeOptions
| FeFloodOptions
| FeMorphologyOptions
| FeFloodOptions
| FeOffsetOptions
export type FeSerialized = FeBlendSerialized
| FeBlurSerialized
| FeTurbulenceSerialized
| FeDisplacementSerialized
| FeColorMatrixSerialized
| FeComponentTransferSerialized
| FeCompositeSerialized
| FeConvolveMatrixSerialized
| FeMergeSerialized
| FeFloodSerialized
| FeMorphologySerialized
| FeFloodSerialized
| FeOffsetSerialized

export interface BaseFe {
  id: number
  type: FeType
  in1: FeIn
  result: FeResult
}

export type FeBlendSerialized = [FeId, FeType, FeIn, FeResult, FeIn2, number]
export interface FeBlendOptions extends BaseFe {
  in2: FeIn2
  mode: typeof feBlendMode[number]
}

export type FeBlurSerialized = [FeId, FeType, FeIn, FeResult, number, number]
export interface FeBlurOptions extends BaseFe {
  x: number
  y: number
}

export type FeCompositeSerialized = [FeId, FeType, FeIn, FeResult, FeIn2, number]
export interface FeCompositeOptions extends BaseFe {
  in2: FeIn2
  operator: typeof feCompositeOperator[number]
}

export type FeConvolveMatrixSerialized = [FeId, FeType, FeIn, FeResult, number[]]
export interface FeConvolveMatrixOptions extends BaseFe {
  matrix: number[]
}

export type FeMergeSerialized = [FeId, FeType, FeIn, FeResult, number[]]
export interface FeMergeOptions extends BaseFe {
  array: number[]
}

export type FeFloodSerialized = [FeId, FeType, FeIn, FeResult, string, number]
export interface FeFloodOptions extends BaseFe {
  color: string
  opacity: number
}

export type FeMorphologySerialized = [FeId, FeType, FeIn, FeResult, number, [number, number]]
export interface FeMorphologyOptions extends BaseFe {
  operator: typeof feMorphologyOperator[number]
  radius: [number, number]
}

export type FeColorMatrixSerialized = [FeId, FeType, FeIn, FeResult, number, string]
export interface FeColorMatrixOptions extends BaseFe {
  variant: typeof feColorMatrixVariant[number]
  value: string
}

export type FeOffsetSerialized = [FeId, FeType, FeIn, FeResult, number, number]
export interface FeOffsetOptions extends BaseFe {
  x: number
  y: number
}

type ComponentFunc = TableComponentFunc
| LinearComponentFunc
| GammaComponentFunc
| IdentityComponentFunc
| DiscreteComponentFunc
interface IdentityComponentFunc { type: 'identity' }
interface DiscreteComponentFunc {
  type: 'discrete'
  tableValues: number[]
}
interface TableComponentFunc {
  type: 'table'
  tableValues: number[]
}
interface LinearComponentFunc {
  type: 'linear'
  slope: number
  intercept: number
}
interface GammaComponentFunc {
  amplitude: number
  exponent: number
  offset: number
}
export type FeComponentTransferSerialized = [FeId, FeType, FeIn, FeResult, ComponentFunc, ComponentFunc, ComponentFunc, ComponentFunc]
export interface FeComponentTransferOptions extends BaseFe {
  a: ComponentFunc
  b: ComponentFunc
  g: ComponentFunc
  r: ComponentFunc
}

export type FeTurbulenceSerialized = [FeId, FeType, FeIn, FeResult, number, number, number, boolean, boolean]
export interface FeTurbulenceOptions extends BaseFe {
  baseFrequency: number
  numOctaves: number
  seed: number
  stitchTiles: boolean
  turbulence: boolean
}

type ChannelSelector = 0 | 1 | 2 | 3
export type FeDisplacementSerialized = [FeId, FeType, FeIn, FeResult, FeIn2, number, ChannelSelector, ChannelSelector]
export interface FeDisplacementOptions extends BaseFe {
  in2: FeIn2
  scale: number
  xChannelSelector: ChannelSelector
  yChannelSelector: ChannelSelector
}
