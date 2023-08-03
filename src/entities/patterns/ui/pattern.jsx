import { useUnit } from 'effector-react'
import { Option, Select } from '@mui/joy'
import { patternsModel } from '../model'
import { WavePattern } from './pattern-wave'
import { CrossPattern } from './pattern-cross'
import { HerringbonePattern } from './pattern-herringbone'
import { LinePattern } from './pattern-line'
import { NewPattern } from './pattern-new'
import { FlowerPattern } from './pattern-flower'
import { PlusPattern } from './pattern-plus'
import { CirclesPattern } from './pattern-circles'
import { PlaidPattern } from './pattern-plaid'
import { SquaresPattern } from './pattern-squares'
import { drawApi } from '@/shared/lib'

const { patternMap } = drawApi

const patternOptions = Object.entries(patternMap)
const patternsComponents = {
  [patternMap.WAVES]: WavePattern,
  [patternMap.CROSS]: CrossPattern,
  [patternMap.HERRINGBONE]: HerringbonePattern,
  [patternMap.LINE]: LinePattern,
  [patternMap.NEW]: NewPattern,
  [patternMap.FLOWER]: FlowerPattern,
  [patternMap.PLUS]: PlusPattern,
  [patternMap.CIRCLES]: CirclesPattern,
  [patternMap.PLAID]: PlaidPattern,
  [patternMap.SQUARES]: SquaresPattern,
}

export function PatternCard({ patternId, palette }) {
  const { patterns, changePattern } = useUnit(patternsModel)

  const pattern = patterns[patternId]
  if (!pattern)
    return null

  const PatternComponent = patternsComponents[pattern.patternType]
  const handlePatternChange = (_, value) =>
    changePattern({ id: patternId, type: value })

  return (
    <>
      <Select
        className='nodrag'
        value={pattern.patternType}
        onChange={handlePatternChange}
        name='pattern-type'
        sx={{ mb: 1 }}
        size='sm'
      >
        {patternOptions.map(([name, value]) =>
          <Option key={value} value={value}>{name}</Option>,
        )}
      </Select>
      <PatternComponent
        id={patternId}
        palette={palette}
        data={pattern}
      />
    </>
  )
}
