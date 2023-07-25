import { deleteEffect } from '.'
import { DeleteButton } from '@/shared/ui/delete-button'

export function DeleteEffectButton({ effectId, nodeId }) {
  return <DeleteButton onClick={() => deleteEffect({ effectId, nodeId })} />
}
