import { useUnit } from 'effector-react'
import { LinearProgress, Typography } from '@mui/joy'
import { NodeCard, SaveButton } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'
import { drawApi, fxhashApi } from '@/shared/lib'
import { configApi } from '@/shared/config'

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
      <StorageSpace />
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

function StorageSpace() {
  const { params } = useUnit(fxhashApi.manager)
  const value = (params.config.byteLength / configApi.configParamLength) * 100
  return <>
    <Typography gutterBottom>
      Data storage limit
    </Typography>
    <LinearProgress
      value={value}
      sx={{ mb: 1 }}
      determinate
    />
  </>
}
