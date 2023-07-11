import { SliderPicker } from 'react-color'
import { useUnit } from 'effector-react'
import { Box, Card } from '@mui/joy'
import { useEffect } from 'react'
import { model } from './model'
import { Handle, NodeCard } from '@/shared/ui'

export function PaletteNode({ id, data }) {
  const {
    completeUpdate,
    updateColor,
    setNodeId,
    color,
  } = useUnit(model)

  useEffect(() => {
    setNodeId(id)
  }, [id])

  return <>
    <NodeCard
      name='Color palette'
      cloneable={false}
      deletable={false}
      sx={{ mb: 0.5 }}
    >
      <SliderPicker
        color={color}
        onChange={updateColor}
        onChangeComplete={completeUpdate}
        className='nodrag'
      />
    </NodeCard>

    {data?.colorIds.map(id =>
      <Card key={id} sx={{ borderRadius: 'sm', py: 1, mb: 0.5 }} variant='outlined'>
        <Box sx={{
          borderRadius: 'xs',
          backgroundColor: data[id].color,
          height: 10,
        }} />
        <Handle
          id={id}
          type='source'
          position='right'
        />
      </Card>,
    )}
  </>
}
