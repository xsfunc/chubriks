import { useUnit } from 'effector-react'
import { NodeCard } from '@/shared/ui'
import { flowManager } from '@/shared/lib'
import { Eyes, Mouth, Nose } from '@/entities/face'

export function FaceNode({ id, data }) {
  const { updateNodeData } = useUnit(flowManager)
  const handleEyeVariantChange = (_, newValue) => {
    const data = { variant: newValue }
    updateNodeData({ id, data })
  }
  const handleChange = param =>
    (event) => {
      const data = { [param]: event.target.value }
      updateNodeData({ id, data })
    }

  return (
    <>
      <NodeCard
        name='Face'
        sx={{ mb: 0.5, pb: 1 }}
        deletable={false}
      />
      <Eyes data={data} id={id} />
      <Nose data={data} id={id} />
      <Mouth data={data} id={id} />
    </>
  )
}
