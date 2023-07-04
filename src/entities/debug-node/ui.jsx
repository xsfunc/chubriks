import { useUnit } from 'effector-react'
import { Handle, Position } from 'reactflow'
import { flowManager } from '../flow-manager/model'

const handleStyle = { marginTop: 20 }

export function DebugNode({ id, data }) {
  const { debug, debugMessage } = useUnit(flowManager)

  return (
    <div className="text-updater-node">
      <button onClick={debug}>Debug</button>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="color" style={handleStyle} />
    </div>
  )
}
