import { NodeCard } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'

export function ResultNode({ children }) {
  return <>
    <NodeCard
      name='Result'
      deletable={false}
      sx={{ width: 540 }}>

      {children}

      <TargetHandle
        name='Head node'
        options={{
          id: 'head',
          isConnectable: true,
        }}
      />
      <TargetHandle
        name='Background node'
        options={{
          id: 'back',
          isConnectable: true,
        }}
      />
    </NodeCard>
  </>
}
