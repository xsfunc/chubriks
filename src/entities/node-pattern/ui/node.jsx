import { useUnit } from 'effector-react'
import { Option, Select } from '@mui/joy'
import { model } from '../model'
import { patternsComponentsMap } from '../lib'
import { Handle, NodeCard } from '@/shared/ui'
import { patternList } from '@/shared/lib'

export function PatternNode({ id, data }) {
  const { changePattern } = useUnit(model)
  const PatternComponent = patternsComponentsMap[data.patternType]
  const handlePatternChange = (_, value) => changePattern({ id, patternType: value })

  return (
    <NodeCard name='Pattern'>
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
      <PatternComponent id={id} data={data} />
      <Handle id="main" type="source" position='right' />
    </NodeCard>
  )
}
