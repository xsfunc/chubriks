import { useUnit } from 'effector-react'
import { NodeCard, SaveButton } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'
import { drawApi } from '@/shared/lib'

export function ResultNode({ children }) {
  const { download } = useUnit(drawApi.manager)
  return <>
    <NodeCard
      name='Result'
      deletable={false}
      sx={{ width: 540 }}
      customButton={<SaveButton onClick={download} />}
      hasCustomButton
    >
      {children}
      <TargetHandle
        name='Head node'
        options={{
          id: 'head',
        }}
      />
      <TargetHandle
        name='Background node'
        options={{
          id: 'back',
        }}
      />
    </NodeCard >
  </>
}
