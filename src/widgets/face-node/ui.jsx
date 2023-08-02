import { memo } from 'react'
import { NodeCard } from '@/shared/ui'
import { Eyes, Mouth } from '@/entities/face'

export function FaceNode({ id, data }) {
  return (
    <>
      <NodeCard
        name='Face'
        sx={{ mb: 0.5, pb: 1 }}
        deletable={false}
      />
      <Eyes data={data} id={id} />
      {/* <Nose data={data} id={id} /> */}
      <Mouth data={data} id={id} />
    </>
  )
}

export const MemoFaceNode = memo(FaceNode, () => true)
