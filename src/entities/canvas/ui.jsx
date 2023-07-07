import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { drawManager } from '@/shared/lib/draw'

export function Canvas({ style }) {
  const { canvas } = useUnit(drawManager)
  const svgWrapper = useRef(null)

  useEffect(() => {
    canvas.draw.addTo(svgWrapper.current)
    return () => canvas.draw.clear()
  }, [svgWrapper])

  return <svg
    viewBox={canvas.viewBox}
    ref={svgWrapper}
    style={{
      backgroundColor: 'white',
      width: '100vmin',
      height: '100vmin',
      ...style,
    }}
/>
}
