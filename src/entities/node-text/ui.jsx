import { useUnit } from 'effector-react'
import { Handle, Position } from 'reactflow'
import { flowManager } from '../flow-manager/model'
import './ui.css'

const handleStyle = { marginTop: 20 }

export function TextNode({ id, data }) {
  const { updateNode } = useUnit(flowManager)
  const handleChange = param =>
    event => updateNode({ id, data: { [param]: event.target.value } })

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange('name')}
          className="nodrag"
        />
        <label htmlFor="desc">Desc:</label>
        <input
          id="desc"
          name="desc"
          value={data.description}
          onChange={handleChange('description')}
          className="nodrag"
        />
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Right} id="b" style={handleStyle} />
    </div>
  )
}
