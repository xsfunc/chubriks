import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { drawApi } from '@/shared/lib/draw'

export function Canvas({ style }) {
  const { canvas } = useUnit(drawApi.manager)

  useEffect(() => {
    canvas.draw.addTo('div#svg')
  }, [])

  return <div
    id='svg'
    style={{
      width: '100vmin',
      height: '100vmin',
      ...style,
    }}
  />
}
