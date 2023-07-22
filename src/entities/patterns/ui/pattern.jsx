import { useUnit } from 'effector-react'
import { Option, Select } from '@mui/joy'
import { model } from '../internal-model'
import { patternsComponentsMap } from '../lib'
import { patternsModel } from '../model'
import { patternList } from '@/shared/lib'

export function PatternCard({ id, data }) {
  const { changePattern } = useUnit(model)
  const { patternsList } = useUnit(patternsModel)
  // const pattern = patternsList.find(pattern => pattern.nodeId === id)
  const PatternComponent = patternsComponentsMap.waves
  const handlePatternChange = (_, value) => changePattern({ id, patternType: value })
  return (
    <>
      <Select
        value={data.patternType}
        onChange={handlePatternChange}
        name='pattern-type'
        sx={{ mb: 1 }}
        size='sm'
      >
        {patternList.map(pattern =>
          <Option key={pattern} value={pattern}>{pattern}</Option>,
        )}
      </Select>

      <PatternComponent
        id={id}
        data={patternsList[0]}
      />
    </>
  )
}
