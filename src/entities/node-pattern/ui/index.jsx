import { useUnit } from 'effector-react'
import { Waves1Pattern } from './pattern-waves-1'
import { Handle, NodeCard, SelectInput } from '@/shared/ui'
import { flowManager } from '@/shared/lib'

const patternTypes = {
  waves1: Waves1Pattern,
}

export function PatternNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNodeData({ id, data })
    }

  const PatternComponent = patternTypes[data.patternType]

  return (
    <NodeCard name='Pattern'>
      <SelectInput
        name='pattern type'
        value={data.patternType}
        onChange={handleChange('patternType')}
        options={Object.keys(patternTypes)}
      />

      <PatternComponent data={data} onChange={() => () => null} />
      <Handle type="source" position='right' id="head-source" />
    </NodeCard>
  )
}
