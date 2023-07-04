import { useUnit } from 'effector-react'
import { Handle, Position } from 'reactflow'
import { Waves1Pattern } from './pattern-waves-1'
import { SelectInput } from '@/shared/input'
import { flowManager } from '@/entities/flow-manager'

const patternTypes = {
  waves1: Waves1Pattern,
}

export function PatternNode({ id, data }) {
  const { updateNode } = useUnit(flowManager)
  const PatternComponent = patternTypes[data.patternType]
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNode({ id, data })
    }

  return (
    <div className="text-updater-node">
      <SelectInput
        name='pattern type'
        value={data.patternType}
        onChange={handleChange('patternType')}
        options={Object.keys(patternTypes)}
      />
      <PatternComponent data={data} onChange={() => null} />
      <Handle type="source" position={Position.Right} id="head-source" />
    </div>
  )
}
