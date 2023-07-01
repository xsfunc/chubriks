import { useEffect, useRef } from 'react'
import { Handle, Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { svg } from './model'
import './ui.css'

export function ResultNode() {
  const { canvas } = useUnit(svg)
  const svgWrapper = useRef(null)

  useEffect(() => {
    canvas.draw.addTo(svgWrapper.current)
    return () => canvas.draw.clear()
  }, [svgWrapper])

  return <>
    <div className="result-node">
      <Handle
        type="target"
        position={Position.Left}
        id='leftEye'
      />
      <Handle type="target" position={Position.Left} id='rightEye' style={{ marginTop: 10, backgroundColor: 'green' }} />
      <Handle type="target" position={Position.Left} id='background' style={{ marginTop: 20, backgroundColor: 'blue' }} />
      <svg className="canvas" viewBox={`0 0 ${canvas.size} ${canvas.size}`} ref={svgWrapper} />
    </div>
  </>
}
