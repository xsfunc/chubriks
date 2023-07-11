import { NodeCard } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'

export function ResultNode({ children }) {
  return <>
    <NodeCard
      name='Result'
      deletable={false}
      cloneable={false}
      sx={{ width: 540 }}>

      {children}

      <TargetHandle
        name='Head'
        options={{
          id: 'head',
          isConnectable: true,
        }}
      />
      <TargetHandle
        name='Background: color, pattern'
        options={{
          id: 'background',
          isConnectable: true,
        }}
      />
    </NodeCard>
  </>
}
