import { useUnit } from 'effector-react'
import { Handle, Position } from 'reactflow'
import { flowManager } from '../flow-manager'
import { Input } from '@/shared/input'

const filtersTypes = {
  blur: BlurFilter,
}

export function FiltersNode({ id, data }) {
  return (
    <div className="text-updater-node">
      {data.filters.map((filter) => {
        const Filter = filtersTypes[filter.type]
        return <Filter key={filter.id} nodeId={id} {...filter} />
      })}

      <Handle type="source" position={Position.Right} id="filters" />
    </div>
  )
}

function BlurFilter({ id, nodeId, data }) {
  const { updateNodeFilter } = useUnit(flowManager)
  const handleChange = (event) => {
    updateNodeFilter({
      data: { amount: event.target.value },
      filterId: id,
      nodeId,
    })
  }

  return <>
    <p>Blur filter:</p>
    <Input
      name='amount'
      value={data.amount}
      onChange={handleChange}
      options={{ type: 'range', min: 1, max: 100 }}
    />
  </>
}
