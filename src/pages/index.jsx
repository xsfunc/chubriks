import { useUnit } from 'effector-react'
import { EditorPage } from './editor'
import { PreviewPage } from './preview'
import { fxhashApi } from '@/shared/lib'

const contextTypes = {
  minting: EditorPage,
  standalone: PreviewPage,
  capture: PreviewPage,
}

export function Pages() {
  const { context } = useUnit(fxhashApi.manager)
  const FxContextPage = contextTypes[context]
  return <FxContextPage />
}
