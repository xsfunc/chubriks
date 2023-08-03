import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { EditorPage } from './editor'
import { PreviewPage } from './preview'
import { appStarted } from './init'
import { fxhashApi } from '@/shared/lib'

const contextTypes = {
  minting: EditorPage,
  standalone: PreviewPage,
  capture: PreviewPage,
}

export function Pages() {
  const { context } = useUnit(fxhashApi.manager)
  const onAppStarted = useUnit(appStarted)

  useEffect(() => {
    onAppStarted()
  }, [])

  const FxContextPage = contextTypes[context]
  return <FxContextPage />
}
