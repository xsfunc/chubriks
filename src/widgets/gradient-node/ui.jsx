import { useUnit } from 'effector-react'
import { Card } from '@mui/joy'
import { NodeCard } from '@/shared/ui'
import { Gradient } from '@/entities/gradient'
import { gradientModel } from '@/entities/gradient/model'
import { paletteModel } from '@/entities/palette'
import { AddGradientButton } from '@/features/add-gradient'
import { DeleteGradientButton } from '@/features/delete-gradient'

export function GradientNode({ id }) {
  const { palette } = useUnit(paletteModel)
  const { gradients } = useUnit(gradientModel)
  return <>
    <NodeCard
      name='Gradient palette'
      cloneable={false}
      deletable={false}
      sx={{ mb: 0.5, width: 250 }}
    />

    {gradients.map(gradient =>
      <Gradient
        deleteButton={<DeleteGradientButton id={gradient.id} />}
        nodeId={id}
        key={gradient.id}
        palette={palette}
        gradient={gradient}
      />)
    }

    <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
      <AddGradientButton />
    </Card>
  </>
}
