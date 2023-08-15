import { useUnit } from 'effector-react'
import { Box, LinearProgress, Stack, Typography } from '@mui/joy'
import { NodeCard, SaveButton } from '@/shared/ui'
import { TargetHandle } from '@/shared/ui/param-handle'
import { drawApi, fxhashApi } from '@/shared/lib'
import { configApi } from '@/shared/config'
import { CleanButton } from '@/features/clean-unused-data'

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
  const memory = configApi.configParamLength
  const usedBytes = params.config.byteLength
  const usedPercent = (usedBytes / memory) * 100
  return <Stack
    direction='row'
    alignItems='center'
    gap={1}
  >
    <Box flexGrow={1}>
      <Typography gutterBottom>
        Storage limit ({usedBytes} bytes used)
      </Typography>
      <LinearProgress
        value={usedPercent}
        sx={{ mb: 1 }}
        determinate
      />
    </Box>
    <CleanButton />
  </Stack>
}
