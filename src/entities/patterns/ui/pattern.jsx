import { useUnit } from 'effector-react'
import { Option, Select } from '@mui/joy'
import { patternsModel } from '../model'
import { WavePattern } from './pattern-wave'
import { CrossPattern } from './pattern-cross'
import { HerringbonePattern } from './pattern-herringbone'
import { drawApi } from '@/shared/lib'

const { patternMap } = drawApi

const patternOptions = Object.entries(patternMap)
const patternsComponents = {
  [patternMap.WAVES]: WavePattern,
  [patternMap.CROSS]: CrossPattern,
  [patternMap.HERRINGBONE]: HerringbonePattern,
}

export function PatternCard({ patternId }) {
  const { patterns, changePattern } = useUnit(patternsModel)
  const pattern = patterns[patternId]

  const PatternComponent = patternsComponents[pattern.patternType]
  const handlePatternChange = (_, value) =>
    changePattern({ id: patternId, type: value })

  return (
    <>
      <Select
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
        data={pattern}
      />
    </>
  )
}
