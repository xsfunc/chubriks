import { useUnit } from 'effector-react'
import { Card } from '@mui/joy'
import { memo } from 'react'
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
        key={gradient.id}
        deleteButton={<DeleteGradientButton id={gradient.id} />}
        gradient={gradient}
        palette={palette}
        nodeId={id}
      />)
    }

    <Card variant='outlined' sx={{ p: 1, borderRadius: 'sm' }}>
      <AddGradientButton nodeId={id} />
    </Card>
  </>
}

export const MemoGradientNode = memo(GradientNode, () => true)
