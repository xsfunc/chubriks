import { NodeCard, SaveButton } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'
import toImg from 'react-svg-to-image';

export function ResultNode({ children }) {
  return <>
    <NodeCard
      name='Result'
      deletable={false}
      sx={{ width: 540 }}
      customButton={<SaveButton onClick={() => toImg('svg#result', 'chubrick', { format: 'png' })} />}
      hasCustomButton
    >
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
    </NodeCard >
  </>
}


