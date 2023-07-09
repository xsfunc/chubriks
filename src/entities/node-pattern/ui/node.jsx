import { useUnit } from 'effector-react'
import { Option, Select } from '@mui/joy'
import { model } from '../model'
import { Waves1Pattern } from './pattern-waves-1'
import { Handle, NodeCard } from '@/shared/ui'

const patternTypes = {
  waves1: Waves1Pattern,
}

export function PatternNode({ id, data }) {
  const { changePattern } = useUnit(model)
  const PatternComponent = patternTypes[data.patternType]
  const handlePatternChange = (_, value) => changePattern({ id, value })

  return (
    <NodeCard name='Pattern'>
      <Select
        value={data.patternType}
        onChange={handlePatternChange}
        name='pattern-type'
        size='sm'
      >
        {Object.keys(patternTypes).map(pattern =>
          <Option key={pattern} value={pattern}>{pattern}</Option>,
        )}
      </Select>

      <PatternComponent id={id} data={data} />
      <Handle type="source" position='right' id="head-source" />
    </NodeCard>
  )
}
