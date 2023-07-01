import { useUnit } from 'effector-react'
import { Handle, Position } from 'reactflow'
import { flowManager } from '../flow-manager'
import './ui.css'

const handleStyle = { marginTop: 20 }

export function ColorNode({ id, data }) {
  const { updateNode } = useUnit(flowManager)
  const handleChange = event => updateNode({ id, data: { color: event.target.value } })

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="color">Name:</label>
        <input
          id="color"
          name="color"
          type='color'
          value={data.color}
          onChange={handleChange}
          className="nodrag"
        />
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="color" style={handleStyle} />
    </div>
  )
}
