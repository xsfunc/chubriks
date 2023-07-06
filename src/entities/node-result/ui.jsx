import { useEffect, useRef } from 'react'
import { Position } from 'reactflow'
import { useUnit } from 'effector-react'
import { drawManager } from '@/shared/lib/draw'
import { Handle, NodeCard } from '@/shared/ui'

export function ResultNode() {
  const { canvas } = useUnit(drawManager)
  const svgWrapper = useRef(null)

  useEffect(() => {
    canvas.draw.addTo(svgWrapper.current)
    return () => canvas.draw.clear()
  }, [svgWrapper])

  return <>
    <NodeCard name='Result' sx={{ width: 540 }}>
      <Handle
        type="target"
        position={Position.Left}
        id='leftEye'
      />
      <Handle type="target" position={Position.Left} id='rightEye' />
      <svg className="canvas" viewBox={`0 0 ${canvas.size} ${canvas.size}`} ref={svgWrapper} />
    </NodeCard>
  </>
}
