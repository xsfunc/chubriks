const head = {
  width: 400,
  height: 400,
  radius: 10,
  strokeWidth: 20,
  fill: { type: 'color', color: 'white' },
  stroke: { type: 'color', color: 'black' },
  eyes: {
    fill: 'blur',
    size: 20,
    variant: 1,
  },
  nose: {
    size: 100,
    variant: 1,
  },
  mouth: {
    size: 45,
    variant: 1,
  },
}

const fillTypes = ['color', 'pattern'] as const
type FillType = typeof fillTypes[number]

interface FillBase {
  fillType: FillType
}
interface Color extends FillBase {
  readonly fillType: 'color'
  color: string
}
interface Pattern {
  readonly fillType: 'pattern'
  color: string
  size: 1
  stroke: 2
}
type Fill = Color | Pattern
interface Head {
  width: number
  height: number
  fill?: Fill
  stroke?: Fill
}

const headP: Head = {
  width: 1,
  height: 1,
  fill: {
    fillType: 'color',
    color: 'black',
  },

}

const fillTransformApi: Record<FillType, (data: any) => any[]> = {
  color: (color: Color) => [color.fillType, color.color],
  pattern: (pattern: Pattern) => [pattern.fillType, pattern.size, pattern.stroke],
}

interface Processor {
  serialize: (any) => any
  deserialize: (any) => any
}
const processors: Record<string, Processor> = {
  head: {
    serialize: () => {

    },
    deserialize: (input) => {

    },
  },
  color: {
    serialize: (colorId: number) => {

    },
    deserialize: (input) => {

    },
  },
  patterns: {
    serialize: (input) => {

    },
    deserialize: (input) => {

    },
  },
  effects: {
    serialize: (input) => {

    },
    deserialize: (input) => {

    },
  },
}

function fillToArray(fill?: Fill): any[] {
  if (!fill)
    return []
  const transformFn = fillTransformApi[fill.fillType]
  return transformFn(fill)
}

function headToArray(head) {
  return [
    head.width,
    head.height,
    fillToArray(head.fill),
    fillToArray(head.stroke),
  ]
}

const tupleFromHead = [
  400,
  400,
  10,
  20,
  [
    'color',
    'white',
  ],
  [
    'color',
    'black',
  ],

]
const a = [
  // seed,
  1,
  // effects
  [
    1, // effect type
    2, // effect id
    3, // effect param
    4, // effect param
  ],
  // pattern
  [
    1, // pattern type
    2, // pattern id
    3, // pattern params
    4, // pattern param
  ],
  // back
  [
    // back fill
    [
      1, // fill type
      2, // fill param
    ],
    // back effects ids
    [
      1, 2, 3, 4,
    ],
  ],
  // head
  [
    // head eyes
    [
      1, // eyes type
      2, // eyes size
      3, // eyes y
    ],
    // head nose
    [
      // ... same as eyes
    ],
    // head mouth
    [
      // ... same as eyes
    ],
    // head fill
    [
      1, // type
      // params
    ],
    // head stroke
    [
      1, // type
      // params
    ],
    // head effects ids
    [1, 2, 3],

  ],
]
function objectToArray(obj) {
  const result = []

  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]))
      result.push(objectToArray(obj[key]))

    else
      result.push(obj[key])
  }

  return result
}

// type Color = string
// type HueShift = number
// type Seed = number
// type Width = number
// type Height = number
// type Radius = number
// type FxParams = [
//   // colors config
//   [HueShift, Seed],
//   // head: width, height,
//   [Width, Height, Radius],
//   // eyes
//   [number, number, number],
//   // nose,
//   [number, number, number],
//   // mouth
//   [number, number, number],
//   // effects
//   [number, number, number],
// ]
// function transformParams(params: FxParams) {
//   const [colorConfig] = params
//   const [hue, seed] = colorConfig
//   const colors = new Poline({
//     numPoints: seed,
//   }).colors
//   return {
//     colors,
//     patterns,
//     effects,
//   }
// }
